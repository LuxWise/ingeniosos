import { createSlice } from '@reduxjs/toolkit'

const mailSlice = createSlice({
  name: 'mail',
  initialState: { open: false, mail: '' },
  reducers: {
    openClose: (state, actions) => {
      state.open = actions.payload
    },
    addMail: (state, actions) => {
      state.mail = actions.payload
    },
    clearMail: (state, action) => {
      state.mail = ''
    },

  },
});

export const { openClose, addMail, clearMail } = mailSlice.actions
export default mailSlice.reducer;
