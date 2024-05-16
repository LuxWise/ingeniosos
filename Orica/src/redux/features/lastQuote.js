import { createSlice } from '@reduxjs/toolkit'

const lastQuoteSlice = createSlice({
  name: 'lastQuote',
  initialState: { date: '' },
  reducers: {
    addDate: (state, actions) => {
      state.quote = actions.payload
    }
  },
});

export const { addDate } = lastQuoteSlice.actions
export default lastQuoteSlice.reducer;
