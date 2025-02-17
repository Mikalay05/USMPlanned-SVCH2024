import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EpicService from "../../services/EpicService";

/*
 * ===============
 * DTOs
 * ===============
 */
import EpicActionsDto from "../../DTOs/Data/Actions/EpicActionsDto";


// Получение всех actions
export const getEpicActions = createAsyncThunk(
    "project/getEpicActions",
    async ({paths}) => {
      const response = await EpicService.getEpicActions(paths);
      console.log(response);
      const result = response.epicActions.map((action) => new EpicActionsDto(action));
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
  reducers: {
  },
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
      });
  },
});


export default epicSlice.reducer;
