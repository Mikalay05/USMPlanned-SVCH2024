import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";
import ProjectDTO from "../../DTOs/Data/ProjectDTO";
import InformationProjectDto from "../../DTOs/Data/InformationProjectDto";

// Получение всех проектов
export const getProjects = createAsyncThunk("project/getProjects", async () => {
  const response = await ProjectService.getProjects();
  const result = response.map((project) => new ProjectDTO(project));
  return result;
});

// Создание нового проекта
export const createProject = createAsyncThunk(
  "project/createProject",
  async (data) => {
    const response = await ProjectService.createProject(data);
    return new ProjectDTO(response);
  }
);

// Получение проекта по ID
export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (id) => {
    const response = await ProjectService.getProjectById(id); // Метод для получения данных проекта по ID
    return new InformationProjectDto(response);
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId) => {
    const response = await ProjectService.deleteProject(projectId);
    return response;
  }
);
// Срез проекта
const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [], // Список всех проектов
    selectedProject: null, // Выбранный проект
    isLoading: false, // Состояние загрузки
  },
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения всех проектов
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = Array.isArray(action.payload) ? action.payload : []; // Убедитесь, что это массив
        state.isLoading = false;
      })
      .addCase(getProjects.rejected, (state) => {
        state.isLoading = false;
      })
      // Обработка создания проекта
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      // Обработка получения проекта по ID
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.selectedProject = action.payload; // Устанавливаем выбранный проект
        state.isLoading = false;
      })
      .addCase(getProjectById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Удаляем проект из списка
        state.projects = state.projects.filter(
          (project) => project.projectId !== action.payload.projectId
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

// Экспортируем действия и редьюсер
export const { setProjects, setLoading } = projectSlice.actions;
export default projectSlice.reducer;
