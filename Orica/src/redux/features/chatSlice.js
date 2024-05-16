import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: { open: false, messages: ['Hello, do you need help?'], message: '' },
  reducers: {
    openClose: (state, actions) => {
      state.open = actions.payload
    },
    addMessage: (state, actions) => {
      state.message = actions.payload
    },
    clearMessage: (state, action) => {
      state.message = ''
    },
    addMessages: (state, action) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = ['Hello, do you need help?']
    },

  },
});

export const { openClose, addMessage, addMessages, clearMessage, clearMessages } = chatSlice.actions
export default chatSlice.reducer;
