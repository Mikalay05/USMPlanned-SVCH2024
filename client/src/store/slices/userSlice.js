import LoginUserDto from "../../DTOs/LoginUserDto";
import CurrentUserDataDto from  "../../DTOs/Data/CurrentUserDataDto";
import UserService from "../../services/UserService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Получаем всех пользователей
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await UserService.getAllUsers();
  return response;
});

// Регистрация нового пользователя
export const registrationUser = createAsyncThunk(
  "user/registrationUser",
  async ({ name, surname, patronymic, email, phone, role }, { rejectWithValue }) => {
    try {
      const response = await UserService.registrationUser({
        name,
        surname,
        patronymic,
        email,
        phone,
        role,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error || { message: "Unknown error" });
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk("user/loginUser", async(loginData, {rejectWithValue})=> {
  try {
    const loginDto = new LoginUserDto(loginData);
    console.log("LOGIN DTO", loginData)
    const response = await UserService.loginUser(loginDto);
    return response;
  } catch (error) {
    console.log("ERROR CATCH", error)
    return rejectWithValue(error || { message: "Unknown error" });
  }
});

// Получение данных о текущем пользователе
export const getCurrentUserData = createAsyncThunk('user/currentUserData', async()=> {
  try {
    const currentUserData = await UserService.getCurrenUserData();
    const userDataDto = new CurrentUserDataDto(currentUserData);
    return userDataDto;
  }
  catch(err) {
    console.log("ERROR CATCH", err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    usersDataLogs: [],
    currentUser: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = Array.isArray(action.payload) ? action.payload : [];
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(registrationUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        if (newUser) {
          state.users = [...state.users, newUser];
        }
        state.isLoading = false;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "An unexpected error occurred" };
      })
      
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { resultUserDto } = action.payload || {};
        if (resultUserDto) {
          localStorage.setItem("token", resultUserDto.accessToken); // Сохраняем токен
        }
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Login failed" };
      })
      
      .addCase(getCurrentUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserData.fulfilled, (state, action) => {
        // Сохраняем данные текущего пользователя из ответа
        const data = action.payload || {};
        state.currentUser = data;
        state.isLoading = false;
      })
      .addCase(getCurrentUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Unable to fetch current user data" };
      });
  },
});

export default userSlice.reducer;
