import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RoleService from '../../services/RoleService';
import RoleDto from '../../DTOs/Data/RoleDto';

// Асинхронное действие для получения списка ролей
export const getRoles = createAsyncThunk(
  'role/getRoles',
  async () => {
    const response = await RoleService.getAllRoles();
    const result = response.map((role) => new RoleDto(role)); // Маппинг данных в DTO
    return result;
  }
);

// Создаём слайс для Role
const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: [], // Список ролей
    isLoading: false, // Индикатор загрузки
    error: null, // Для обработки ошибок
  },
  reducers: {
    // Пример редьюсеров, если они понадобятся
    setRoles(state, action) {
      state.roles = action.payload; // Устанавливаем роли вручную
    },
    setLoading(state, action) {
      state.isLoading = action.payload; // Управление флагом загрузки вручную
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Сбрасываем ошибки при новом запросе
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = Array.isArray(action.payload)
          ? action.payload
          : []; // Убедимся, что это массив
        state.isLoading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Сохраняем сообщение об ошибке
      });
  },
});

export const { setRoles, setLoading } = roleSlice.actions; // Экспортируем синхронные экшены

export default roleSlice.reducer; // Экспорт редьюсера
