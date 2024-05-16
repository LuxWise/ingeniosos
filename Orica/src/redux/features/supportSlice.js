import { createSlice } from '@reduxjs/toolkit'

const supportSlice = createSlice({
  name: 'cart',
  initialState: { subject: '', type: '', description: '' },
  reducers: {
    addSubject: (state, action) => {
      state.subject = action.payload
    },
    addType: (state, action) => {
      state.type = action.payload
    },
    addDescription: (state, action) => {
      state.description = action.payload
    },
  },
});


export const { addSubject, addType, addDescription } = supportSlice.actions
export default supportSlice.reducer;
