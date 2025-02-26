import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EpicService from "../../services/EpicService";

/*
 * ===============
 * DTOs
 * ===============
 */
import EpicActionsDto from "../../DTOs/Data/Actions/EpicActionsDto";
import InformationEpicDto from "../../DTOs/Data/Information/InformationEpicDto";
import StoryForCreationDTO from "../../DTOs/ForCreation/StoryForCreationDTO";
import ReorderStoriesUpdateDto from "../../DTOs/ForUpdate/ReorderStoriesUpdateDto";
import EpicDataForUpdateDto from "../../DTOs/ForUpdate/EpicDataForUpdateDto";

export const updateDataOfEpic = createAsyncThunk(
  "project/updateDataOfEpic",
  async ({ paths, objectForBody }) => {
    const dataDto = new EpicDataForUpdateDto(objectForBody);
    const response = await EpicService.updateDataOfEpic(paths, dataDto);
    return response;
  }
);
export const deleteEpic = createAsyncThunk(
  "project/deleteEpic",
  async ({ paths }) => {
    const response = await EpicService.deleteEpic(paths);
    return response;
  }
);
// Получение всех actions
export const getEpicActions = createAsyncThunk(
  "project/getEpicActions",
  async ({ paths }) => {
    const response = await EpicService.getEpicActions(paths);
    const result = response.epicActions.map(
      (action) => new EpicActionsDto(action)
    );
    return result;
  }
);
export const getCurrentEpic = createAsyncThunk(
  "project/getCurrentEpic",
  async ({ paths }) => {
    const response = await EpicService.getCurrentEpic(paths);

    const result = new InformationEpicDto(response);
    return result;
  }
);

export const getChainForSelectionInTheEpic = createAsyncThunk(
  "project/getChainForSelectionInTheEpic",
  async ({ paths }) => {
    const response = await EpicService.getChainForSelectionInTheEpic(paths);
    //TODO DTO
    const result = response;
    return result;
  }
);
export const createStory = createAsyncThunk(
  "customer/createStory",
  async ({ paths, dataForCreate }) => {
    const dataDto = new StoryForCreationDTO(dataForCreate);
    const response = await EpicService.createStory(paths, dataDto);
    return response;
  }
);

export const reorderStories = createAsyncThunk(
  "customer/reorderStories",
  async ({ paths, data }) => {
    const dataDto = new ReorderStoriesUpdateDto(data);
    const response = await EpicService.reorderStories(paths, dataDto);
    return response;
  }
);
const epicSlice = createSlice({
  name: "epic",
  initialState: {
    epicActions: {
      actionsData: [],
      isLoading: false,
    },
    currentEpic: {
      epicData: {},
      isLoading: false,
    },
    storiesForSelectInTheEpic: {
      storiesData: [],
      isLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEpicActions.pending, (state) => {
        state.epicActions.isLoading = true;
      })
      .addCase(getEpicActions.fulfilled, (state, action) => {
        state.epicActions.actionsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.epicActions.isLoading = false;
      })
      .addCase(getEpicActions.rejected, (state) => {
        state.epicActions.isLoading = false;
      })
      //GROUP getCurrentEpic
      .addCase(getCurrentEpic.pending, (state) => {
        state.currentEpic.isLoading = true;
      })
      .addCase(getCurrentEpic.fulfilled, (state, action) => {
        state.currentEpic.epicData = action.payload;
        state.currentEpic.isLoading = false;
      })
      .addCase(getCurrentEpic.rejected, (state) => {
        state.currentEpic.isLoading = false;
      })
      //GROUP getChainForSelectionInTheEpic
      .addCase(getChainForSelectionInTheEpic.pending, (state) => {
        state.storiesForSelectInTheEpic.isLoading = true;
      })
      .addCase(getChainForSelectionInTheEpic.fulfilled, (state, action) => {
        state.storiesForSelectInTheEpic.storiesData = action.payload;
        state.storiesForSelectInTheEpic.isLoading = false;
      })
      .addCase(getChainForSelectionInTheEpic.rejected, (state) => {
        state.storiesForSelectInTheEpic.isLoading = false;
      })
      //GROUP createStory
      .addCase(createStory.pending, (state) => {
        state.storiesForSelectInTheEpic.isLoading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.storiesForSelectInTheEpic.storiesData = action.payload;
        state.storiesForSelectInTheEpic.isLoading = false;
      })
      .addCase(createStory.rejected, (state) => {
        state.storiesForSelectInTheEpic.isLoading = false;
      })
      //GROUP updateDataOfEpic
      .addCase(updateDataOfEpic.pending, (state) => {
        state.currentEpic.isLoading = true;
      })
      .addCase(updateDataOfEpic.fulfilled, (state, action) => {
        state.currentEpic.epicData = action.payload;
        state.currentEpic.isLoading = false;
      })
      .addCase(updateDataOfEpic.rejected, (state) => {
        state.currentEpic.isLoading = false;
      });
  },
});

export default epicSlice.reducer;
