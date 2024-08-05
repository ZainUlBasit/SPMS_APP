import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCustomers } from "../../httpRequest";
import { showErrorToast } from "../../utils/showToasts";

export const fetchCustomers = createAsyncThunk(
  "fetchCustomers",
  async (CurrentUser) => {
    try {
      let response;
      const currentUserObject = JSON.parse(CurrentUser); // Parse the string into an object
      const reqBody = { branch: currentUserObject.branch_number };
      response = await GetCustomers(reqBody);
      const exactCustomer = response.data.data.payload.filter(
        (dt) => dt.email === currentUserObject.email
      );
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return exactCustomer[0];
      }
    } catch (err) {
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const CustomerSlice = createSlice({
  name: "CustomerSlice",
  initialState: {
    loading: true,
    auth: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      console.log("Error", action);
      state.isError = true;
    });
  },
});

export default CustomerSlice.reducer;
