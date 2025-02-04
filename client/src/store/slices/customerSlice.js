import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "../../services/CustomerService";

/*
 * ===============
 * DTOs
 * ===============
 */
import CustomerActionsDto from "../../DTOs/Data/Actions/CustomerActionsDto";
import InformationCustomerDto from "../../DTOs/Data/Information/InformationCustomerDto";
import ChainForSelectionInTheCustomer from "../../DTOs/Data/ChainForSelect/ChainForSelectionInTheCustomer";


// Получение всех actions
export const getCustomerActions = createAsyncThunk(
  "customer/getCustomerActions",
  async (customerId) => {
    const response = await CustomerService.getCustomerActions(customerId);
    const result = response.customerActions.map(
      (action) => new CustomerActionsDto(action)
    );
    return result;
  }
);

// Получение current customer
export const getCurrentCustomer = createAsyncThunk(
  "customer/getCurrentCustomer",
  async (customerId) => {
    const response = await CustomerService.getCurrentCustomer(customerId);
    const result = new InformationCustomerDto(response);
    return result;
  }
);
// Получение получить цепт epic for customer
export const getChainForSelectionInTheCustomer = createAsyncThunk(
  "customer/getChainForSelectionInTheCustomer",
  async (customerId) => {
    const response = await CustomerService.getChainForSelectionInTheCustomer(
      customerId
    );
    const result = response.map(
      (item) => new ChainForSelectionInTheCustomer(item)
    );
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
    currentCustomer: {
      customerData: {},
      isLoading: false,
    },
    epicsForSelectInTheCustomer: {
      epicsData: [],
      isLoading: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GROUP getCustomerActions
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
      })
      //GROUP getCurrentCustomer
      .addCase(getCurrentCustomer.pending, (state) => {
        state.currentCustomer.isLoading = true;
      })
      .addCase(getCurrentCustomer.fulfilled, (state, action) => {
        state.currentCustomer.customerData = action.payload;
        state.currentCustomer.isLoading = false;
      })
      .addCase(getCurrentCustomer.rejected, (state) => {
        state.currentCustomer.isLoading = false;
      })
      //GROUP getChainForSelectionInTheCustomer
      .addCase(getChainForSelectionInTheCustomer.pending, (state) => {
        state.epicsForSelectInTheCustomer.isLoading = true;
      })
      .addCase(getChainForSelectionInTheCustomer.fulfilled, (state, action) => {
        state.epicsForSelectInTheCustomer.epicsData = action.payload;
        state.epicsForSelectInTheCustomer.isLoading = false;
      })
      .addCase(getChainForSelectionInTheCustomer.rejected, (state) => {
        state.epicsForSelectInTheCustomer.isLoading = false;
      });
  },
});

export default customerSlice.reducer;
