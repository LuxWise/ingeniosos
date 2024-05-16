import { createSlice } from '@reduxjs/toolkit';

const proformaSlice = createSlice({
  name: 'proforma',
  initialState: {
    cartProforma: [],
    paganName: '',
    paganLastName: '',
    bank: '',
    taxes: '',
    total: '',
    taxesPercentage: '',
    accountNumber: '',
    email: ''
  },
  reducers: {
    add: (state, action) => {
      const productIndex = state.cartProforma.findIndex(item => item.product === action.payload.product);
      if (productIndex !== -1) {
        state.cartProforma[productIndex].quantity = action.payload.quantity;
        state.cartProforma[productIndex].price = action.payload.price;
      } else {
        state.cartProforma.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
          price: action.payload.price,
        });
      }
    },
    removeProformaCart: (state) => {
      state.cartProforma = []
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
    addPaganName: (state, action) => {
      state.paganName = action.payload;
    },
    addPaganLastName: (state, action) => {
      state.paganLastName = action.payload;
    },
    addBank: (state, action) => {
      state.bank = action.payload;
    },
    addTaxes: (state, action) => {
      state.taxes = action.payload;
    },
    addTotal: (state, action) => {
      state.total = parseFloat(action.payload)
    },
    addTaxesPercentage: (state, action) => {
      state.taxesPercentage = action.payload
    },
    addAccountNumber: (state, action) => {
      state.accountNumber = action.payload
    },
    addEmail: (state, action) => {
      state.email = action.payload
    },
  },
});

export const {
  add,
  addPaganName,
  addPaganLastName,
  addBank,
  addTaxes,
  addTotal,
  addTaxesPercentage,
  addAccountNumber,
  addEmail,
  removeProformaCart
} = proformaSlice.actions;

export default proformaSlice.reducer;