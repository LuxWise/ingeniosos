import { createSlice } from '@reduxjs/toolkit'

const sesionSlice = createSlice({
  name: 'sesion',
  initialState: { sesion: false },
  reducers: {
    change: (state, action) => {
      state.loading = action.payload
    }
  },
});

export const { change } = sesionSlice.actions
export default sesionSlice.reducer;
