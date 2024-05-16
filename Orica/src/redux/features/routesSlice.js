import { createSlice } from '@reduxjs/toolkit'
import jwt from 'jsonwebtoken';

const routeSlice = createSlice({
  name: 'route',
  initialState: { route: "", typeUser: '' },
  reducers: {
    setRoute: (state, actions) => {
      state.route = actions.payload
    },
    jwtDecode: (state, actions) => {
      const decode = jwt.decode(actions.payload);
      state.typeUser = decode.role
    }
  },
});

export const { setRoute, jwtDecode } = routeSlice.actions
export default routeSlice.reducer;
