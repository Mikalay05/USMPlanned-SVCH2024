import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EpicService from "../../services/EpicService";

/*
 * ===============
 * DTOs
 * ===============
 */
import EpicActionsDto from "../../DTOs/Data/Actions/EpicActionsDto";
import InformationEpicDto from "../../DTOs/Data/Information/InformationEpicDto";

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
    console.log(paths)
    alert("TEST IN EPIC SLICE")
    
    const response = await EpicService.getChainForSelectionInTheEpic(paths);
    //TODO DTO
    const result = response;
    console.log(result)
    alert("TEST IN EPIC SLICE result")
    return result;
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
      });
  },
});

export default epicSlice.reducer;
