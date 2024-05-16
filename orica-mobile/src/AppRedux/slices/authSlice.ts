import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    email: "",
    role: "",
    id: "",
    username: "",
    password: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: state => {
      state.user = false;
      state.email = "";
      state.role = "";
      state.id = "";
      state.username = "";
      state.password = "";
    },
  },
});

export const {
  setEmail,
  setRole,
  setId,
  setUserName,
  setPassword,
  setUser,
  setLogout,
} = authSlice.actions;
export default authSlice.reducer;
