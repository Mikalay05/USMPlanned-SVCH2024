import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "../../services/CustomerService";

/*
 * ===============
 * DTOs
 * ===============
 */
import CustomerActionsDto from "../../DTOs/Data/Actions/CustomerActionsDto";

// Получение всех actions
export const getCustomerActions = createAsyncThunk(
    "project/getCustomerActions",
    async (customerId) => {
      const response = await CustomerService.getCustomerActions(customerId);
      const result = response.customerActions.map((action) => new CustomerActionsDto(action));
      return result;
    }
  );
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerActions: {
      actionsData: [],
      isLoading: false,
    },
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerActions.pending, (state) => {

        state.customerActions.isLoading = true;
      })
      .addCase(getCustomerActions.fulfilled, (state, action) => {
        state.customerActions.actionsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.customerActions.isLoading = false;
      })
      .addCase(getCustomerActions.rejected, (state) => {

        state.customerActions.isLoading = false;
      });
  },
});


export default customerSlice.reducer;
