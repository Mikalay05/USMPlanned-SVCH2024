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
      console.log(projects)
      console.log(rows)
      return projects;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }

  async getProjectById(projectId) {
    try {
      const rows = await dbQuery(QUERIES.GET_PROJECT_BY_ID, [projectId]);
      console.log()
      if (rows.length === 0) {
        throw ApiError.notFound("Проект не найден");
      }

      const project = new ProjectDTO(rows[0]);
      return project;
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
  validateRespoe
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
  async validate(projectFormDto) {
    console.log("================")

    this.validateName(projectFormDto.name);
    console.log("Прошел валидацию имени")
    this.validateDescription(projectFormDto.description);
    console.log("Прошел валидацию описания")
    console.log("============")
    console.log("TEst", projectFormDto)
    console.log("============")
    await this.validateStatusProjectId(projectFormDto.status_id);

    console.log("Прошел валидацию айди статуса")

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
      await this.validate(projectForm);

      // Создать проект в базе данных
      const resultFromDb = await this.dbQueryCreateProject(projectForm, whoCreateProject);
      console.log("====================")
      console.log("ОТВЕТ НА СОЗДАНИЕ ПРОЕКТА ПО ХП");
      console.log(resultFromDb);
      console.log("====================")

      const extractedData = Object.values(resultFromDb[0])[0];
      console.log("====================")
      console.log("ПРЕОБРАЗОВАНИЯ ОБЬЕКТА С ХП В ОБЬЕКТ");
      console.log(extractedData);

      console.log("====================")

      const result = new ProjectDTO({
        project_id: extractedData.id,
        project_name: extractedData.name,
        project_description: extractedData.description,
        status_id: extractedData.status_id,
      });
    
      console.log("====================")
      console.log("ОТВЕТ НА СОЗДАНИЕ ПРОЕКТА ОТ СЕРВЕРА");
      console.log(result);
      console.log("====================")
      return result;
    } catch (err) {
      console.error("Error executing createProject:", err);
      throw err; // Пробрасываем оригинальную ошибку
    }
  }
}

module.exports = new ProjectService();
