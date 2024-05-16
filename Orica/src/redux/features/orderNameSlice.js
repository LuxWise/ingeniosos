import { createSlice } from '@reduxjs/toolkit'

const orderNameSlice = createSlice({
  name: 'orderName',
  initialState: {
    nameOrder: '',
    port: '',
    portSelect: false,
    divideSelect: [],
    divideSelectId: [],
    orderNameDetails: ''
  },
  reducers: {
    addDivideSelect: (state, action) => {
      action.payload.map(item => {
        state.divideSelect.push(item)
        state.divideSelectId.push(item.id)
      })
    },
    removeDivideSelect: (state, action) => {
      const divideIndex = state.divideSelect.findIndex(item => item.id === action.payload)
      const divideIndexId = state.divideSelectId.findIndex(item => item === action.payload)

      state.divideSelect.splice(divideIndex, 1)
      state.divideSelectId.splice(divideIndexId, 1)

    },
    setName: (state, action) => {
      state.nameOrder = action.payload
    },
    setPort: (state, action) => {
      state.port = action.payload
    },
    setPortSelect: (state, action) => {
      state.portSelect = action.payload
    },
    setOrderNameDetails: (state, action) => {
      state.orderNameDetails = action.payload
    },
    deleteOrderStroge: (state) => {
      state.nameOrder = '';
      state.divideSelect = [];
      state.divideSelectId = [];
      state.port = '';
      state.portSelect = false;
    },
    deleteDetails: (state) => {
      state.orderNameDetails = ''
    }
  },
});


export const { addDivideSelect, setName, setPort, setPortSelect, removeDivideSelect, setOrderNameDetails, deleteOrderStroge, deleteDetails } = orderNameSlice.actions
export default orderNameSlice.reducer;