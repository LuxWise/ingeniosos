import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'auth',
  initialState: { name: {}, userInfo: [], nameUser: '', lastName: '', email: '', typeUser: '', table: '', open: false, cl: '', userStatus: '', userType: '', newUsername: '', confirmUsername: '', username: '', newPassword: '', confirmPassword: '', password: '' },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    addName: (state, action) => {
      state.nameUser = action.payload
    },
    addLastName: (state, action) => {
      state.lastName = action.payload
    },
    addEmail: (state, action) => {
      state.email = action.payload
    },
    addTypeUser: (state, action) => {
      state.typeUser = action.payload
    },
    addTable: (state, action) => {
      state.table = action.payload
    },
    addChange: (state, action) => {
      state.cl = action.payload
    },
    addUserStatus: (state, action) => {
      state.userStatus = action.payload
    },
    addUserType: (state, action) => {
      state.userType = action.payload
    },
    addNewUsername: (state, action) => {
      state.newUsername = action.payload
    },
    confirmNewUsername: (state, action) => {
      state.confirmUsername = action.payload
    },
    newUsername: (state, action) => {
      state.username = action.payload
    },
    addNewPassword: (state, action) => {
      state.newPassword = action.payload
    },
    confirmNewPassword: (state, action) => {
      state.confirmPassword = action.payload
    },
    newPassword: (state, action) => {
      state.password = action.payload
    },
    cleanChange: (state) => {
      state.newPassword = ''
      state.confirmPassword = ''
      state.newUsername = ''
      state.confirmUsername = ''
      state.password = ''
      state.username = ''
    },
    openClose: (state, action) => {
      state.open = action.payload
    },
    removeUserStorage: (state) => {
      state.nameUser = '';
      state.lastName = '';
      state.email = '';
      state.typeUser = '';
    },
    removeUserSelected: (state) => {
      state.userInfo = '';
    },
  },
});

export const { setName, setUserInfo, addName, addLastName, addEmail, addTypeUser, addTable, openClose, addChange, addUserStatus, addUserType, addNewPassword, confirmNewUsername, addNewUsername, newUsername, confirmNewPassword, cleanChange, newPassword, removeUserStorage, removeUserSelected } = userSlice.actions
export default userSlice.reducer;