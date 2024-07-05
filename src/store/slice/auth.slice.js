import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
  auth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    processing: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
      state.auth = false;
    },
    login: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.auth = true;
    },
    register: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.auth = false;
    },
    issue: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      state.auth = false;
    },
    logout: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.auth = false;
    },
  },
});
export const { processing, login, register, issue, logout } = authSlice.actions;
export default authSlice.reducer;
