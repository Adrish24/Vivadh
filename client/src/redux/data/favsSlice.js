import { createSlice } from "@reduxjs/toolkit";

const favsSlice = createSlice({
  name: "favourites",
  initialState: {
    favs: [],
  },
  reducers: {
    setFavs: (state, action) => {
      state.favs = action.payload;
    },
    updateFavs: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const exisitingItem = state.favs.find((f) => f._id === newItem._id);
      if (!exisitingItem) {
        state.favs.push(newItem);
      } else {
        state.favs = state.favs.filter((f) => f._id !== newItem._id);
        console.log(state.favs)
      }
    },
  },
});

export default favsSlice.reducer;
export const { setFavs, updateFavs } = favsSlice.actions;
