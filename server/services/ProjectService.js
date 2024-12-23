const ApiError = require("../error/ApiError");
const ProjectDTO = require("../DTOs/Data/ProjectDTO");
const QUERIES = require("../queries/queries");
const { dbQuery } = require("../dbUtils");
const { ProjectStatus } = require("../models/models");

class ProjectService {
  async getAllProjects() {
    try {
      const rows = await dbQuery(QUERIES.GET_ALL_PROJECTS);
      const projects = rows.map((row) => new ProjectDTO(row));
      return projects;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка при получении списка проектов");
    }
  }

  async getProjectById(projectId) {
    try {
      const rows = await dbQuery(QUERIES.GET_PROJECT_BY_ID, [projectId]);

      if (rows.length === 0) {
        throw ApiError.notFound("Проект не найден");
      }

      const project = new ProjectDTO(rows[0]);
      return project;
    } catch (err) {
      console.error("Error executing query:", err);
      throw ApiError.internal("Ошибка при получении проекта");
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
    const result = await ProjectStatus.findOne({where: {id: status_id}})
    if (result.length === 0) {
        throw ApiError.badRequest("Статус проекта с таким ID не существует");
      }
      return result;
  }
  // Валидация ID статуса проекта с проверкой наличия статуса в базе
  async validateStatusProjectId(status_id) {
    try {
        await this.checkExistStatucProjectId(status_id);

    } catch (err) {
      console.error("Error executing validateStatusProjectId:", err);
      throw ApiError.internal("Ошибка при проверке статуса проекта");
    }
  }

  // Общая валидация для всех полей проекта
  async validate(projectFormDto) {
    this.validateName(projectFormDto.name);
    this.validateDescription(projectFormDto.description);
    await this.validateStatusProjectId(projectFormDto.status_id);  // Асинхронная проверка статуса
  }

  // Запрос на создание проекта в базе данных
  async dbQueryCreateProject(projectForm, whoCreateProject) {
    try {
      const result = await dbQuery(QUERIES.CREATE_PROJECT, [
        projectForm.name,
        projectForm.description,
        projectForm.status_id,
        'Created project',
        whoCreateProject
      ]);

      return result; 
    } catch (err) {
      console.error("Error executing dbQueryCreateProject:", err);
      throw ApiError.internal("Ошибка при создании проекта");
    }
  }

  // Основной метод для создания проекта
  async createProject(projectForm, whoCreateProject) {
    try {
      // Пройти валидацию объекта
      await this.validate(projectForm);

      // Создать проект в базе данных
      const result = await this.dbQueryCreateProject(projectForm, whoCreateProject);

      // Получить созданный проект (например, с его ID)
      const createdProject = await this.getProjectById(result.insertId);

      return createdProject;
    } catch (err) {
      console.error("Error executing createProject:", err);
      throw ApiError.internal("Ошибка при создании проекта");
    }
  }
}

module.exports = new ProjectService();
