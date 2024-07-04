import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    toggleSort: false,
    toggleView: false,
    sortBy: "All",
    view: "Compact",
  },
  reducers: {
    setToggleSort: (state, action) => {
      state.toggleSort = action.payload;
    },
    setToggleView: (state, action) => {
      state.toggleView = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  setToggleSort,
  setToggleView,
  setSortBy,
  setView,
} = filterSlice.actions;
