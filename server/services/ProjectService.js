const ApiError = require("../error/ApiError");
const ProjectDTO = require("../DTOs/Data/ProjectDTO");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { ProjectStatus } = require("../models/models");
const {Project} = require('../models/models')

class ProjectService {
  async getAllProjects(showActive,showPrecent) {
    try {
      const params = [null, showPrecent, showActive]
      console.log('params',params)
      const rows = await dbQuery(QUERIES.GET_ALL_PROJECTS, params);
      return rows;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }

  async getProjectById(projectId, showPrecent = false, showActions = false) {
    try {
      const params = [projectId, showPrecent,showActions];
      const rows = await dbQuery(QUERIES.GET_PROJECT_BY_ID, params);
      console.log("ROWS", rows)
      if (rows.length === 0) {
        throw ApiError.notFound("Проект не найден");
      }
      return rows[0];
    } catch (err) {
      console.error("Error executing query:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }

  // Валидация названия проекта
  validateName(name) {
    if (!name || name.trim().length === 0) {
      throw ApiError.badRequest("Название проекта не может быть пустым");
    }
  }

  // Валидация описания проекта
  validateDescription(description) {
    if (!description || description.trim().length === 0) {
      throw ApiError.badRequest("Описание проекта не может быть пустым");
    }
  }


  async checkExistStatucProjectId(status_id) {
    const result = await ProjectStatus.findOne({ where: { id: status_id } });
    if (!result) {
      throw ApiError.badRequest("Статус проекта с таким ID не существует");
    }
    return result;
  }
  // Валидация ID статуса проекта с проверкой наличия статуса в базе
  async validateStatusProjectId(status_id) {
    try {
      ApiError.validateNotEmptyObject(status_id, "Статус проекта обязательный к заполнению")
      await this.checkExistStatucProjectId(status_id);
    } catch (err) {
      console.error("Error executing validateStatusProjectId:", err);
      throw err; // Пробрасываем оригинальную ошибку
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
      throw ApiError.badRequest("проекта с таким ID не существует");
    }
    return result;
  }
  async validateProjectId(projectId) {
    try {
      ApiError.validateNotEmptyObject(projectId, "Id проекта обязательный к заполнению")
      await this.checkExistProjectId(projectId);
    } catch (err) {
      console.error("Error executing validateProjectId:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }
  async validateProjectForUpdateDto(projectFormDto) {
    console.log("projectFormDto", projectFormDto)
    await this.validateProjectId(projectFormDto.project_id)
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

      return result;
    } catch (err) {
      console.error("Error executing dbQueryCreateProject:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }

  // Основной метод для создания проекта
  async createProject(projectForm, whoCreateProject) {
    try {
      // Пройти валидацию объекта
      await this.validateProjectForCreationDto(projectForm);
    //TODO проверка прав доступа

      // Создать проект в базе данных
      const resultFromDb = await this.dbQueryCreateProject(projectForm, whoCreateProject);
      const extractedData = Object.values(resultFromDb[0])[0];
      const result = new ProjectDTO({
        project_id: extractedData.id,
        project_name: extractedData.name,
        project_description: extractedData.description,
        status_id: extractedData.status_id,
      });
    
      return result;
    } catch (err) {
      console.error("Error executing createProject:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }
    // Запрос на создание проекта в базе данных
    async dbQueryUpdateProject(projectForm, whoCreateProject) {
      try {
        const params = [
          projectForm.name,  // Пример полей объекта projectForm
          projectForm.description,
          projectForm.project_id,
          projectForm.status_id,
          'Updated description for the project',
          whoCreateProject
        ];
  
        const result = await dbQuery(QUERIES.UPDATE_PROJECT, params);
  
        return result;
      } catch (err) {
        console.error("Error executing dbQueryUpdateProject:", err);
        throw err; // Пробрасываем оригинальную ошибку
      }
    }
   
  async updateProject(projectFormDto, whoUpdateProject) {
    //TODO проверка прав доступа
    try {
      // Пройти валидацию объекта
      await this.validateProjectForUpdateDto(projectFormDto);
      const resultFromDb = await this.dbQueryUpdateProject(projectFormDto, whoUpdateProject);
      const extractedData = Object.values(resultFromDb[0])[0];
      const result = new ProjectDTO({
        project_id: extractedData.id,
        project_name: extractedData.name,
        project_description: extractedData.description,
        status_id: extractedData.status_id,
      });
      return result;
    }
   catch (err) {
    console.error("Error executing updateProject:", err);
    throw err; // Пробрасываем оригинальную ошибку
  }
  }
  async deleteProject(projectId, userId) {
    //TODO проверка прав доступа
    try {
      await this.validateProjectId(projectId)
      const deleteProject = Project.destroy({where: {id: projectId}});
      return deleteProject;
    }
   catch (err) {
    console.error("Error executing deleteProject:", err);
    throw err; // Пробрасываем оригинальную ошибку
  }
  }
}

module.exports = new ProjectService();
