import { createSlice } from '@reduxjs/toolkit'

const quoteSlice = createSlice({
  name: 'quote',
  initialState: { quote: "" },
  reducers: {
    setQoute: (state, action) => {
      state.quote = action.payload
    },
    clean: (state, action) => {
      state.quote = action.payload
    },
    removeQuote: (state) => {
      state.quote = ""
    }
  },
});

export const { setQoute, clean, removeQuote } = quoteSlice.actions
export default quoteSlice.reducer;
