import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false },
  reducers: {
    change: (state, actions) => {
      state.loading = actions.payload
    }
  },
});

export const { change } = authSlice.actions
export default authSlice.reducer;
