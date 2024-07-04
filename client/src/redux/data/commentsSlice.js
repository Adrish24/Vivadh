import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    updateComments: (state, action) => {
      const newItem = action.payload;
      state.comments.push(newItem);
    },
    addPropertiesToComments: (state, action) => {
      if (state.comments) {
        state.comments = {
          ...state.comments,
          ...action.payload,
        };
      } else {
        state.comments = {
          ...action.payload,
        };
      }
    },
  },
});

export default commentsSlice.reducer;
export const { setComments, updateComments, addPropertiesToComments } = commentsSlice.actions;
