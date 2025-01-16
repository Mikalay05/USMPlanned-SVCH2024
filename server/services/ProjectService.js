const ApiError = require("../error/ApiError");
const ProjectDTO = require("../DTOs/Data/ProjectDTO");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { ProjectStatus, Project } = require('../models/models');

const ERROR_MESSAGES = {
  getAllProjectsError: "Ошибка при получении проектов",
  getProjectByIdError: "Ошибка при получении проекта",
  projectNotFoundError: "Проект не найден",
  nameRequiredError: "Название проекта не может быть пустым",
  descriptionRequiredError: "Описание проекта не может быть пустым",
  invalidStatusIdError: "Статус проекта с таким ID не существует",
  statusRequiredError: "Статус проекта обязательный к заполнению",
  projectIdRequiredError: "Id проекта обязательный к заполнению",
  projectNotExistError: "Проекта с таким ID не существует",
  createProjectError: "Ошибка при создании проекта",
  updateProjectError: "Ошибка при обновлении проекта",
  deleteProjectError: "Ошибка при удалении проекта"
};

const DETAILS = {
  nameErrorField: 'projectNameErr',
  descriptionErrorField: 'projectDescriptionErr',
  statusIdErrorField: 'statusIdErr',
  projectIdErrorField: 'projectIdErr'
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
        error: err.message
      });
    }
  }

  async getProjectById(projectId, showPrecent = false, showActions = false) {
    try {
      const params = [projectId, showPrecent, showActions];
      const rows = await dbQuery(QUERIES.GET_PROJECT_BY_ID, params);
      if (rows.length === 0) {
        throw ApiError.notFound(ERROR_MESSAGES.projectNotFoundError, {
          projectId,
          error: "Проект с данным ID не найден"
        });
      }
      return rows[0];
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectByIdError, {
        projectId,
        error: err.message
      });
    }
  }

  // Валидация названия проекта
  validateName(name) {
    ApiError.validateNotEmptyObject(name, ERROR_MESSAGES.nameRequiredError, {
      [DETAILS.nameErrorField]: 'Name required'
    });
  }

  // Валидация описания проекта
  validateDescription(description) {
    ApiError.validateNotEmptyObject(description, ERROR_MESSAGES.descriptionRequiredError, {
      [DETAILS.descriptionErrorField]: 'Description required'
    });
  }

  async checkExistStatucProjectId(status_id) {
    const result = await ProjectStatus.findOne({ where: { id: status_id } });
    if (!result) {
      throw ApiError.badRequest(ERROR_MESSAGES.invalidStatusIdError, {
        [DETAILS.statusIdErrorField]: 'Invalid status ID'
      });
    }
    return result;
  }

  // Валидация ID статуса проекта с проверкой наличия статуса в базе
  async validateStatusProjectId(status_id) {
    try {
      ApiError.validateNotEmptyObject(status_id, ERROR_MESSAGES.statusRequiredError, {
        [DETAILS.statusIdErrorField]: 'Status ID is required'
      });
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
        [DETAILS.projectIdErrorField]: 'Project not found'
      });
    }
    return result;
  }

  async validateProjectId(projectId) {
    try {
      ApiError.validateNotEmptyObject(projectId, ERROR_MESSAGES.projectIdRequiredError, {
        [DETAILS.projectIdErrorField]: 'Project ID is required'
      });
      await this.checkExistProjectId(projectId);
    } catch (err)      {
      console.error("Error executing validateProjectId:", err);
      throw ApiError.internal(ERROR_MESSAGES.getProjectByIdError, {
        projectId,
        error: err.message
      });
    }
  }

  async validateProjectForUpdateDto(projectFormDto) {
    await this.validateProjectId(projectFormDto.project_id);
    this.validateName(projectFormDto.name);
    this.validateDescription(projectFormDto.description);
    await this.validateStatusProjectId(projectFormDto.status_id);
  }

  // Запрос на создание проекта в базе данных
  async dbQueryCreateProject(projectForm, whoCreateProject) {
    try {
      const params = [
        projectForm.name,
        projectForm.description,
        projectForm.status_id,
        'Created project',
        whoCreateProject,
      ];

      const result = await dbQuery(QUERIES.CREATE_PROJECT, params);
      console.log("result",result)
      return result;
    } catch (err) {
      console.error("Error executing dbQueryCreateProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.createProjectError, {
        projectForm,
        error: err.message
      });
    }
  }

  // Основной метод для создания проекта
  async createProject(projectForm, whoCreateProject) {
    try {
      // Пройти валидацию объекта
      await this.validateProjectForCreationDto(projectForm);

      // Создать проект в базе данных
      const resultFromDb = await this.dbQueryCreateProject(projectForm, whoCreateProject);
      const extractedData = Object.values(resultFromDb[0])[0];
      console.log('extractedData',extractedData)

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
        projectForm.name,  // Пример полей объекта projectForm
        projectForm.description,
        projectForm.project_id,
        projectForm.status_id,
        'Updated description for the project',
        whoUpdateProject
      ];

      const result = await dbQuery(QUERIES.UPDATE_PROJECT, params);
      return result;
    } catch (err) {
      console.error("Error executing dbQueryUpdateProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.updateProjectError, {
        projectForm,
        error: err.message
      });
    }
  }

  async updateProject(projectFormDto, whoUpdateProject) {
    try {
      // Пройти валидацию объекта
      await this.validateProjectForUpdateDto(projectFormDto);
      const resultFromDb = await this.dbQueryUpdateProject(projectFormDto, whoUpdateProject);
      const extractedData = Object.values(resultFromDb[0])[0];
      const result = new ProjectDTO(extractedData);
      return result;
    } catch (err) {
      console.error("Error executing updateProject:", err);
      throw ApiError.internal(ERROR_MESSAGES.updateProjectError, {
        projectFormDto,
        error: err.message
      });
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
        error: err.message
      });
    }
  }
}

module.exports = new ProjectService();
