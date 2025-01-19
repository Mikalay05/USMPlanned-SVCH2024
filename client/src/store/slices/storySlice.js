import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoryService from "../../services/StoryService";

/*
 * ===============
 * DTOs
 * ===============
 */
import StoryActionsDto from "../../DTOs/Data/Actions/StoryActionsDto";

// Получение всех actions для story
export const getStoryActions = createAsyncThunk(
  "project/getStoryActions",
  async (storyId) => {
    const response = await StoryService.getStoryActions(storyId);
    const result = response.storyActions.map((action) => new StoryActionsDto(action));
    return result;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyActions: {
      actionsData: [],
      isLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoryActions.pending, (state) => {
        state.storyActions.isLoading = true;
      })
      .addCase(getStoryActions.fulfilled, (state, action) => {
        state.storyActions.actionsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.storyActions.isLoading = false;
      })
      .addCase(getStoryActions.rejected, (state) => {
        state.storyActions.isLoading = false;
      });
  },
});

export default storySlice.reducer;
