import UserService from "../../services/UserService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await UserService.getAllUsers();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = Array.isArray(action.payload)?action.payload: [];
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state)=> {
        state.isLoading = false;
      })
  },
});

export default userSlice.reducer;
