import { createSlice } from '@reduxjs/toolkit'

const divideSlice = createSlice({
  name: 'divide',
  initialState: {
    open: false,
    id: '',
    product: '',
    quantity: '',
    port: '',
    quantityDivide: '',
    price: '',
    date: '',
    divid: [],
    didvidSubmit: [],
    dividDetails: '',
    updateDivide: ''
  },
  reducers: {
    openClose: (state, actions) => {
      state.open = actions.payload
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setQuantityDivide: (state, action) => {
      state.quantity = action.payload
    },
    setDivideDetails: (state, action) => {
      state.dividDetails = action.payload
    },
    removeAll: (state) => {
      state.quote = ''
    },
    createTmp: (state, action) => {
      state.tmp.push()
    },
    addPort: (state, actions) => {
      state.port = actions.payload
    },
    addQuantityDivide: (state, actions) => {
      state.quantityDivide = actions.payload
    },
    addPrice: (state, actions) => {
      state.price = actions.payload
    },
    addDate: (state, actions) => {
      state.date = actions.payload
    },
    addDivide: (state, action) => {
      const productIndex = state.divid.findIndex(item => item.page == action.payload.page);
      if (productIndex !== -1) {
        state.divid[productIndex] = action.payload;
      } else {
        state.divid.push(action.payload);
      }
    },
    addDivideSubmit: (state, action) => {
      state.didvidSubmit.push(action.payload)
    },
    updateDivide: (state, action) => {
      state.updateDivide = action.payload
    },
    removeDivide: (state) => {
      state.divid = []
    },
    removeDivideSubmit: (state) => {
      state.didvidSubmit = []
    },
    removeAllDivide: (state) => {
      state.id = '';
      state.product = '';
      state.quantity = '';
      state.port = '';
      state.quantityDivide = '';
      state.price = '';
      state.date = '';
      state.open = false;
      state.divid = [];
      state.didvidSubmit = [];
      state.updateDivide = '';
    },
    removeDivideDetails: (state) => {
      state.dividDetails = ''
    }
  },
});


export const { openClose, setId, setProduct, setQuantityDivide, setDivideDetails, removeAll, addPort, addQuantityDivide, addPrice, addDate, addDivide, addDivideSubmit, updateDivide, removeDivide, removeDivideSubmit, removeAllDivide, removeDivideDetails } = divideSlice.actions
export default divideSlice.reducer;

