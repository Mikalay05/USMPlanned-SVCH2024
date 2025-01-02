import LoginUserDto from "../../DTOs/LoginUserDto";
import UserService from "../../services/UserService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await UserService.getAllUsers();
  return response;
});
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

export const loginUser = createAsyncThunk("user/loginUser", async(loginData, {rejectWithValue})=> {
  try {
    const loginDto = new LoginUserDto(loginData);
    console.log("LOGIN DTO", loginData)
    const response = await UserService.loginUser(loginDto);
    return response;
  } catch (error) {
    console.log("ERRPR CATCH", error)

    return rejectWithValue(error || { message: "Unknown error" });
  }
}
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
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
        // Сохраняем ошибку в state, если она есть
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An unexpected error occurred" };
        }
      });
      
  },
});

export default userSlice.reducer;
