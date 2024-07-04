import { createSlice } from "@reduxjs/toolkit";

const singlePostSlice = createSlice({
  name: "single",
  initialState: {
    singlePost: null,
  },
  reducers: {
    setSinglePost: (state, action) => {
      state.singlePost = action.payload; 
    },
    addProperties: (state, action) => {
      if (state.singlePost) {
        state.singlePost = {
          ...state.singlePost,
          ...action.payload,
        };
      } else {
        state.singlePost = {
          ...action.payload,
        };
      }
    },
  },
});

export default singlePostSlice.reducer;
export const { setSinglePost, addProperties } = singlePostSlice.actions;
