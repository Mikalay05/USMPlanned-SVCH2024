import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../../services/TaskService"; 

/*
 * ===============
 * DTOs
 * ===============
 */
import TaskActionsDto from "../../DTOs/Data/Actions/TaskActionsDto"; 

// Получение всех actions для task
export const getTaskActions = createAsyncThunk(
  "project/getTaskActions",  
  async (taskId) => {
    const response = await TaskService.getTaskActions(taskId);  
    console.log(response)
    const result = response.taskActions.map((action) => new TaskActionsDto(action));  
    return result;
  }
);

const taskSlice = createSlice({  
  name: "task", 
  initialState: {
    taskActions: {  
      actionsData: [],
      isLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskActions.pending, (state) => {
        state.taskActions.isLoading = true;  
      })
      .addCase(getTaskActions.fulfilled, (state, action) => {
        state.taskActions.actionsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.taskActions.isLoading = false; 
      })
      .addCase(getTaskActions.rejected, (state) => {
        state.taskActions.isLoading = false; 
      });
  },
});

export default taskSlice.reducer; 
