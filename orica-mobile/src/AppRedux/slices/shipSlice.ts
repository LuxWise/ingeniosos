import { createSlice } from "@reduxjs/toolkit";

const shipSlice = createSlice({
  name: "ship",
  initialState: {
    ship: false,
    search: "",
    shipInfo: "",
  },
  reducers: {
    setShip: (state, action) => {
      state.ship = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShipInfo: (state, action) => {
      state.shipInfo = action.payload;
    },
    setClear: state => {
      state.ship = false;
      state.search = "";
      state.shipInfo = "";
    },
  },
});

export const { setShip, setSearch, setShipInfo, setClear } = shipSlice.actions;
export default shipSlice.reducer;
