import { createSlice } from '@reduxjs/toolkit'

const logoutSlice = createSlice({
  name: 'logout',
  initialState: { open: false },
  reducers: {
    openClose: (state, action) => {
      state.open = action.payload
    }
  },
});

export const { openClose } = logoutSlice.actions
export default logoutSlice.reducer;
