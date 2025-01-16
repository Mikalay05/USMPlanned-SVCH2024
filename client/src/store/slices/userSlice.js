import LoginUserDto from "../../DTOs/LoginUserDto";
import UserDataUpdateDto from "../../DTOs/ForUpdate/UserDataUpdateDto";
import UserPasswordUpdateDto from "../../DTOs/ForUpdate/UserPasswordUpdateDto";
import CurrentUserDataDto from  "../../DTOs/Data/CurrentUserDataDto";
import UserDataByIdDto from  "../../DTOs/Data/UserDataByIdDto";
import UserService from "../../services/UserService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  "user/changePassword", // уникальное имя действия
  async ({ userId, updatedPasswordData }, { rejectWithValue }) => {
    try {
      console.log(updatedPasswordData)

      const formDto = new UserPasswordUpdateDto(updatedPasswordData);
      console.log(formDto)
      const response = await UserService.updateUserPassword(userId, formDto); // добавляем метод для обновления пароля
      return response;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error || { message: "Failed to update password" });
    }
  }
);



export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedUserData }, { rejectWithValue }) => {
    try {
      const formDto = new UserDataUpdateDto(updatedUserData);
      console.log("FORM DATA", formDto);
      const response = await UserService.updateUser(userId, formDto);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error || { message: "Failed to update user data" });
    }
  }
);

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
export const getUserDataById = createAsyncThunk('user/getUserDataById', async(userId) => {
  try {
    const userData = await UserService.getUserDataById(userId);
    console.log("RESULT",userData)
    const userDataDto = new UserDataByIdDto(userData);
    return userDataDto;
  }
  catch(err) {
    console.log("ERROR CATCH", err);
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    usersDataLogs: [],
    currentUser: {},
    isLoading: false,
    error: null,
    targetUser: {},
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        // Обновляем данные пользователя в `users` или `currentUser`
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        if (state.currentUser.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Failed to update user data" };
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        // Обновляем данные пароля в текущем пользователе
        if (state.currentUser.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Failed to update password" };
      })

      .addCase(getUserDataById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDataById.fulfilled, (state, action) => {
        // Сохраняем данные текущего пользователя из ответа
        const data = action.payload || {};
        state.targetUser = data;
        state.isLoading = false;
      })
      .addCase(getUserDataById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Unable to fetch target user data" };
      })
  },
});

export default userSlice.reducer;
