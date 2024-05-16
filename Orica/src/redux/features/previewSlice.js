import { createSlice } from '@reduxjs/toolkit'

const previewSlice = createSlice({
  name: 'preview',
  initialState: { cart: [], quoteNumber: "" },
  reducers: {
    addPreview: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItemIndex = state.cart.findIndex(item => item.product === product && item.quantity === quantity);

      if (existingItemIndex !== -1) {
      } else {
        state.cart.push(action.payload);
      }
    },
    removePreview: (state) => {
      state.cart = []
    },
    setNumber: (state, action) => {
      state.quoteNumber = action.payload
    }
  },
});


export const { addPreview, removePreview, setNumber } = previewSlice.actions
export default previewSlice.reducer;
