import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    cartReview: [],
    product: '',
    quantity: '',
    price: '',
    taxes: '',
    changes: '',
    comments: ''
  },
  reducers: {
    add: (state, action) => {
      const productIndex = state.cartReview.findIndex(item => item.product === action.payload.product);
      if (productIndex !== -1) {
        state.cartReview[productIndex].quantity = action.payload.quantity;
        state.cartReview[productIndex].price = action.payload.price;
      } else {
        state.cartReview.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
          price: action.payload.price,
        });
      }
    },
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    addQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    removeQuantity: (state) => {
      state.quantity = '';
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
    addTaxes: (state, action) => {
      state.taxes = action.payload;
    },
    addChanges: (state, action) => {
      state.changes = action.payload;
    },
    addComments: (state, action) => {
      state.comments = action.payload;
    },
    removeCartReview: (state) => {
      state.cartReview = [];
    },
    removeAll: (state) => {
      state.cartReview = []
      state.price = ''
      state.changes = ''
      state.taxes = ''
      state.comments = ''
    }
  },
});

export const {
  add,
  addProduct,
  addQuantity,
  addPrice,
  addTaxes,
  removeCartReview,
  addChanges,
  addComments,
  removeQuantity,
  removeAll
} = reviewSlice.actions;

export default reviewSlice.reducer;
