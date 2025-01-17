import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    loading: true,
    auth: false,
    data: null,
    isError: false,
  },
  reducers: {
    SetAuth: (state, action) => {
      state.auth = true;
      state.loading = false;
      state.data = action.payload;
    },
    SetAuthNotFound: (state, action) => {
      state.auth = false;
      state.loading = false;
      state.data = null;
    },
  },
});

export const { SetAuth, SetAuthNotFound } = AuthSlice.actions;
export default AuthSlice.reducer;
