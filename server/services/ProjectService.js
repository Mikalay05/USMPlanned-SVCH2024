const ApiError = require("../error/ApiError");
const ProjectDTO = require("../DTOs/Data/ProjectDTO");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { ProjectStatus, Project } = require("../models/models");

const ERROR_MESSAGES = {
  getAllProjectsError: "Ошибка при получении проектов",
  getProjectByIdError: "Ошибка при получении проекта",
  getProjectActionByIdError: "Ошибка при получении действий проекта",
  projectNotFoundError: "Проект не найден",
  nameRequiredError: "Название проекта не может быть пустым",
  descriptionRequiredError: "Описание проекта не может быть пустым",
  invalidStatusIdError: "Статус проекта с таким ID не существует",
  statusRequiredError: "Статус проекта обязательный к заполнению",
  projectIdRequiredError: "Id проекта обязательный к заполнению",
  projectNotExistError: "Проекта с таким ID не существует",
  createProjectError: "Ошибка при создании проекта",
  updateProjectError: "Ошибка при обновлении проекта",
  deleteProjectError: "Ошибка при удалении проекта",
};

const DETAILS = {
  nameErrorField: "projectNameErr",
  descriptionErrorField: "projectDescriptionErr",
  statusIdErrorField: "statusIdErr",
  projectIdErrorField: "projectIdErr",
};

class ProjectService {
  async getAllProjects(showActive, showPrecent) {
    try {
      const params = [null, showPrecent, showActive];
      const rows = await dbQuery(QUERIES.GET_ALL_PROJECTS, params);
      return rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getAllProjectsError, {
        error: err.message,
      });
    }
  }

  async getProjectById(projectId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "process_project";
    try {
      const params = [projectId];
      const rows = await dbQuery(QUERIES.GET_PROJECT_DATA_BY_ID, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectByIdError, {
        projectId,
        error: err.message,
      });
    }
  }
  async getProjectActionById(projectId) {
    try {
      const params = [projectId];
      const rows = await dbQuery(QUERIES.GET_PROJECT_ACTIONS_BY_ID, params);
      const actions = rows[0].get_project_actions; // Извлекаем внутренний массив
      return actions;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectActionByIdError, {
        projectId,
        error: err.message,
      });
    }
  }

  // Валидация названия проекта
  validateName(name) {
    ApiError.validateNotEmptyObject(name, ERROR_MESSAGES.nameRequiredError, {
      [DETAILS.nameErrorField]: "Name required",
    });
  }

  // Валидация описания проекта
  validateDescription(description) {
    ApiError.validateNotEmptyObject(
      description,
      ERROR_MESSAGES.descriptionRequiredError,
      {
        [DETAILS.descriptionErrorField]: "Description required",
      }
    );
  }

  async checkExistStatucProjectId(status_id) {
    const result = await ProjectStatus.findOne({ where: { id: status_id } });
    if (!result) {
      throw ApiError.badRequest(ERROR_MESSAGES.invalidStatusIdError, {
        [DETAILS.statusIdErrorField]: "Invalid status ID",
      });
    }
    return result;
  }

  // Валидация ID статуса проекта с проверкой наличия статуса в базе
  async validateStatusProjectId(status_id) {
    try {
      ApiError.validateNotEmptyObject(
        status_id,
        ERROR_MESSAGES.statusRequiredError,
        {
          [DETAILS.statusIdErrorField]: "Status ID is required",
        }
      );
      await this.checkExistStatucProjectId(status_id);
    } catch (err) {
      console.error("Error executing validateStatusProjectId:", err);
      throw err;
    }
  }

  // Общая валидация для всех полей проекта
  async validateProjectForCreationDto(projectFormDto) {
    this.validateName(projectFormDto.name);
    this.validateDescription(projectFormDto.description);
    await this.validateStatusProjectId(projectFormDto.status_id);
  }

  async checkExistProjectId(projectId) {
    const result = await Project.findOne({ where: { id: projectId } });
    if (!result) {
      throw ApiError.badRequest(ERROR_MESSAGES.projectNotExistError, {
        [DETAILS.projectIdErrorField]: "Project not found",
      });
    }
    return result;
  }

  async validateProjectId(projectId) {
    try {
      ApiError.validateNotEmptyObject(
        projectId,
        ERROR_MESSAGES.projectIdRequiredError,
        {
          [DETAILS.projectIdErrorField]: "Project ID is required",
        }
      );
      await this.checkExistProjectId(projectId);
    } catch (err) {
      console.error("Error executing validateProjectId:", err);
      throw err;
    }
  }

  async validateProjectForUpdateDto(projectFormDto) {
    const errors = {}; // Объект для хранения ошибок
    try {
      // Валидация project_id
      try {
        await this.validateProjectId(projectFormDto.project_id);
      } catch (err) {
        errors[DETAILS.projectIdErrorField] =
          err.details?.[DETAILS.projectIdErrorField] || "Invalid project ID.";
      }

      // Валидация name
      try {
        this.validateName(projectFormDto.name);
      } catch (err) {
        errors[DETAILS.nameErrorField] =
          err.details?.[DETAILS.nameErrorField] || "Invalid name.";
      }

      // Валидация description
      try {
        this.validateDescription(projectFormDto.description);
      } catch (err) {
        errors[DETAILS.descriptionErrorField] =
          err.details?.[DETAILS.descriptionErrorField] ||
          "Invalid description.";
      }

      // Валидация status_id
      try {
        await this.validateStatusProjectId(projectFormDto.status_id);
      } catch (err) {
        errors.statusIdErr = err.details?.statusIdErr || "Invalid status ID.";
      }

      // Если есть ошибки, выбрасываем исключение с объектом ошибок
      if (Object.keys(errors).length > 0) {
        throw ApiError.badRequest("Ошибка валидации", errors);
      }

      // Если ошибок нет, возвращаем успешный результат
      return projectFormDto;
    } catch (err) {
      console.log("Project not pass validation");
      throw err;
    }
  }

  // Запрос на создание проекта в базе данных
  async dbQueryCreateProject(projectForm, whoCreateProject) {
    try {
      const params = [
        projectForm.name,
        projectForm.description,
        projectForm.status_id,
        "Created project",
        whoCreateProject,
      ];

      const result = await dbQuery(QUERIES.CREATE_PROJECT, params);
      return result;
    } catch (err) {
      console.error("Error executing dbQueryCreateProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.createProjectError, {
        projectForm,
        error: err.message,
      });
    }
  }

  // Основной метод для создания проекта
  async createProject(projectForm, whoCreateProject) {
    try {
      // Пройти валидацию объекта
      await this.validateProjectForCreationDto(projectForm);

      // Создать проект в базе данных
      const resultFromDb = await this.dbQueryCreateProject(
        projectForm,
        whoCreateProject
      );
      const extractedData = Object.values(resultFromDb[0])[0];

      return extractedData;
    } catch (err) {
      console.error("Error executing createProject:", err);
      throw err;
    }
  }

  // Запрос на обновление проекта в базе данных
  async dbQueryUpdateProject(projectForm, whoUpdateProject) {
    try {
      const params = [
        projectForm.name, // Пример полей объекта projectForm
        projectForm.description,
        projectForm.project_id,
        projectForm.status_id,
        "Updated description for the project",
        whoUpdateProject,
      ];

      const result = await dbQuery(QUERIES.UPDATE_PROJECT, params);
      return result;
    } catch (err) {
      console.error("Error executing dbQueryUpdateProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.updateProjectError, {
        projectForm,
        error: err.message,
      });
    }
  }

  async updateProject(projectFormDto, whoUpdateProject) {
    try {
      // Пройти валидацию объекта
      await this.validateProjectForUpdateDto(projectFormDto);
      const resultFromDb = await this.dbQueryUpdateProject(
        projectFormDto,
        whoUpdateProject
      );
      const result = await this.getProjectById(projectFormDto.project_id);
      return result;
    } catch (err) {
      console.error("Error executing updateProject:", err);
      throw err;
    }
  }

  async deleteProject(projectId, userId) {
    try {
      await this.validateProjectId(projectId);
      const deleteProject = Project.destroy({ where: { id: projectId } });
      return deleteProject;
    } catch (err) {
      console.error("Error executing deleteProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.deleteProjectError, {
        projectId,
        error: err.message,
      });
    }
  }
  async getChainForSelect(projectId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "get_chain_of_customers_for_project";
    try {
      const params = [projectId];
      const rows = await dbQuery(QUERIES.GET_CHAIN_OF_CUSTOMERS_FOR_PROJECT, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectByIdError, {
        projectId,
        error: err.message
      });
    }
  }
  async createCustomer(projectId, customerDataForCreate, userId) {
    const NAME_OF_OBJECT_FROM_RESULT_OF_DB = "create_customer_and_log_action";
    try {
      const params = [customerDataForCreate.name, projectId, 'Create customer',userId, customerDataForCreate.nextId];
      const rows = await dbQuery(QUERIES.CREATE_CUSTOMER, params);
      const dataResult = rows[0][NAME_OF_OBJECT_FROM_RESULT_OF_DB];
      return dataResult;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("My error");
    } 
  }
}

module.exports = new ProjectService();
