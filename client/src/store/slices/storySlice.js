import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoryService from "../../services/StoryService";

/*
 * ===============
 * DTOs
 * ===============
 */
import StoryActionsDto from "../../DTOs/Data/Actions/StoryActionsDto";
import InformationStoryDto from "../../DTOs/Data/Information/InformationStoryDto";

// Получение всех actions для story
export const getStoryActions = createAsyncThunk(
  "project/getStoryActions",
  async (storyId) => {
    const response = await StoryService.getStoryActions(storyId);
    const result = response.storyActions.map(
      (action) => new StoryActionsDto(action)
    );
    return result;
  }
);

export const getCurrentStory = createAsyncThunk(
  "/project/getCurrentStory",
  async ({ paths }) => {
    const response = await StoryService.getCurrentStory({ paths });
    const result = new InformationStoryDto(response);
    console.log("TES", result);
    alert(1);
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
    currentStory: {
      storyData: {},
      isLoading: false,
    },
    tasksForSelectInTheStory: {
      tasksData: [],
      isLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GROUP getStoryActions
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
      })
      //GROUP getCurrentStory
      .addCase(getCurrentStory.pending, (state) => {
        state.currentStory.isLoading = true;
      })
      .addCase(getCurrentStory.fulfilled, (state, action) => {
        state.currentStory.storyData = action.payload || {};
        state.currentStory.isLoading = false;
      })
      .addCase(getCurrentStory.rejected, (state) => {
        state.currentStory.isLoading = false;
      });
  },
});

export default storySlice.reducer;
