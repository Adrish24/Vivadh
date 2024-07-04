import { createSlice } from "@reduxjs/toolkit";

const toggleSelectButton = createSlice({
  name: "select",
  initialState: {
    page: "",
  },
  reducers: {
    setToggleSelectButton: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default toggleSelectButton.reducer;
export const { setToggleSelectButton } = toggleSelectButton.actions;
