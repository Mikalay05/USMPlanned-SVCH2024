import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TaskStatusService from '../../services/TaskStatusService';
import TaskStatusDto from '../../DTOs/Data/TaskStatusDto';

// Асинхронное действие для получения статусов задач
export const getTaskStatuses = createAsyncThunk(
  'taskStatus/getTaskStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await TaskStatusService.getTaskStatuses();
      return response.map((status) => new TaskStatusDto(status));
    } catch (error) {
      return rejectWithValue(error.message); // Корректная обработка ошибок
    }
  }
);

// Создаём слайс
const taskStatusSlice = createSlice({
  name: 'taskStatus',
  initialState: {
    taskStatuses: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskStatuses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTaskStatuses.fulfilled, (state, action) => {
        state.taskStatuses = action.payload ?? []; // Безопасная проверка
        state.isLoading = false;
      })
      .addCase(getTaskStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки статусов задач';
      });
  },
});

export default taskStatusSlice.reducer;
