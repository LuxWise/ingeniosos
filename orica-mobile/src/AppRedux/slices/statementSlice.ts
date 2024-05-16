import { createSlice } from "@reduxjs/toolkit";

const statementSlice = createSlice({
  name: "statement",
  initialState: {
    satetment: false,
    statementNumber: "",
    statementInfo: {
      glaccount: "",
      billingdocument: "",
      assignment: "",
      documentnumber: "",
      postingdate: "",
      amountindoc: "",
    },
  },
  reducers: {
    setStatement: (state, action) => {
      state.satetment = action.payload;
    },
    setStatementSearch: (state, action) => {
      state.statementNumber = action.payload;
    },
    setStatementInfo: (state, action) => {
      state.statementInfo = action.payload;
    },
  },
});

export const { setStatementInfo, setStatement, setStatementSearch } =
  statementSlice.actions;
export default statementSlice.reducer;
