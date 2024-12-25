import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectStatusService from '../../services/ProjectStatusService';
import ProjectStatusDto from '../../DTOs/Data/ProjectStatusDto';

// Асинхронное действие для получения статусов проектов
export const getProjectStatuses = createAsyncThunk(
  'projectStatus/getProjectStatuses',
  async () => {
    console.log("загружается статуса проектов")
    const response = await ProjectStatusService.getProjectStatuses();

    const result = response.map((status) => new ProjectStatusDto(status));

    return result;
  }
);

// Создаём слайс для ProjectStatus
const projectStatusSlice = createSlice({
  name: 'projectStatus',
  initialState: {
    projectStatuses: [], // Список статусов
    isLoading: false, // Индикатор загрузки
    error: null, // Для обработки ошибок (дополнительно)
  },
  reducers: {
    // Пример редьюсеров, если они понадобятся
    setProjectStatuses(state, action) {
      state.projectStatuses = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectStatuses.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Сбрасываем ошибки
      })
      .addCase(getProjectStatuses.fulfilled, (state, action) => {
        state.projectStatuses = Array.isArray(action.payload)
          ? action.payload
          : []; // Убедимся, что это массив
        state.isLoading = false;
      })
      .addCase(getProjectStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Сохраняем сообщение об ошибке
      });
  },
});

export const { setProjectStatuses } = projectStatusSlice.actions;

export default projectStatusSlice.reducer;
