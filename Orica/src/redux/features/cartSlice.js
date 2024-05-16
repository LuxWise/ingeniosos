import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [], product: '', quantity: '', name: '',
    port: '', phone: '', observations: '', commercial: '',
  },
  reducers: {
    add: (state, action) => {
      const productIndex = state.cart.findIndex(item => item.product === action.payload.product);
      if (productIndex !== -1) {
        state.cart[productIndex].quantity = action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    addProduct: (state, action) => {
      state.product = action.payload
    },
    addQuantity: (state, action) => {
      state.quantity = action.payload
    },
    addName: (state, action) => {
      state.name = action.payload
    },
    addPort: (state, action) => {
      state.port = action.payload
    },
    addPhone: (state, action) => {
      state.phone = action.payload
    },
    addObservations: (state, action) => {
      state.observations = action.payload
    },
    addCommercial: (state, action) => {
      state.commercial = action.payload
    },
    removeCart: (state) => {
      state.cart = []
    },
    removeAll: (state) => {
      state.cart = []
      state.name = ''
      state.port = ''
      state.phone = ''
      state.observations = ''
      state.quantity = ''
      state.commercial = ''
    },
    deleteItemCart: (state, action) => {
      const productIndex = state.cart.findIndex(item => item.product === action.payload);
      state.cart.splice(productIndex, 1)
    },
    getDataCart: (state, action) => {
      const productIndex = state.cart.findIndex(item => item.product === action.payload);
      console.log(cart[productIndex])
    }
  },
});


export const { add, addProduct, addQuantity, addName, addPort, addPhone, addObservations, addCommercial, addComments, addMail, removeCart, removeAll, deleteItemCart } = cartSlice.actions
export default cartSlice.reducer;
