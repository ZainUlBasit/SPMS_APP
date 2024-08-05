import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetBranchItems } from "../../httpRequest";
import { showErrorToast } from "../../utils/showToasts";

export const fetchItems = createAsyncThunk(
  "fetch-items",
  async (CurrentUser) => {
    try {
      let response;
      const currentUserObject = JSON.parse(CurrentUser); // Parse the string into an object
      const reqBody = { branch: currentUserObject.branch_number };
      response = await GetBranchItems(reqBody);
      if (!response.data?.success) {
        showErrorToast(response.data.error.msg);
      } else if (response.data?.success) {
        return response.data.data.payload;
      }
    } catch (err) {
      showErrorToast(err.response.data.error.msg);
    }
    return [];
  }
);

const ItemSlice = createSlice({
  name: "saledetails",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ItemSlice.reducer;
