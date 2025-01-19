import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

/*
 * ===============
 * DTOs
 * ===============
 */
import ProjectDTO from "../../DTOs/Data/ProjectDTO";
import InformationProjectDto from "../../DTOs/Data/InformationProjectDto";
import ProjectForUpdateDto from "../../DTOs/ForUpdate/ProjectForUpdateDto";
import ProjectActionsDto from "../../DTOs/Data/Actions/ProjectActionsDto";

// Обновление проекта
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const dataForm = new ProjectForUpdateDto(projectData);
      const response = await ProjectService.updateProject(projectId, dataForm);
      return response; // Возвращаем объект с обновленным проектом
    } catch (error) {
      return rejectWithValue(error || "Unknown error");
    }
  }
);

// Получение всех actions
export const getProjectActions = createAsyncThunk(
  "project/getProjectActions",
  async (projectId) => {
    const response = await ProjectService.getProjectActions(projectId);
    const result = response.projectActions.map((action) => new ProjectActionsDto(action));
    return result;
  }
);

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
    status: null, // Статус для deleteProject
    error: null, // Ошибка для отображения в случае неудачи
    projectActions: {
      actionsData: [],
      isLoading: false,
    },
    currentProject: {
      projectData: {},
      isLoading: false,
    }
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
      // Обработка удаления проекта
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true; // Добавляем загрузку для удаления
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Удаляем проект из списка
        state.projects = state.projects.filter(
          (project) => project.projectId !== action.payload.projectId
        );
        state.isLoading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })
      // Обработка обновления проекта
      .addCase(updateProject.pending, (state) => {})
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        state.projects = state.projects.map((project) =>
          project.projectId === updatedProject.projectId
            ? updatedProject
            : project
        ); // Обновляем проект в списке
        state.selectedProject = action.payload; // Обновляем выбранный проект
      })
      .addCase(updateProject.rejected, (state) => {})
      // Обработка получения всех проектов
      .addCase(getProjectActions.pending, (state) => {
        state.projectActions.isLoading = true;
      })
      .addCase(getProjectActions.fulfilled, (state, action) => {
        state.projectActions.actionsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.projectActions.isLoading = false;
      })
      .addCase(getProjectActions.rejected, (state) => {
        state.projectActions.isLoading = false;
      });
  },
});

// Экспортируем действия и редьюсер
export const { setProjects, setLoading } = projectSlice.actions;
export default projectSlice.reducer;
