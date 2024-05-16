import { createSlice } from '@reduxjs/toolkit'

const shipSlice = createSlice({
  name: 'ship',
  initialState: { open: false, search: '', number: 0 },
  reducers: {

    searchShip: (state, action) => {
      state.search = action.payload
    },
    shipNumber: (state, action) => {
      state.number = action.payload
    }
  },
});

export const { searchShip, shipNumber } = shipSlice.actions
export default shipSlice.reducer;
