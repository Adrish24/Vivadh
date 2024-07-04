import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import toggleSelectButton from "./slices/toggleSelectButton";
import postsSlice from "./data/postsSlice";
import favsSlice from "./data/favsSlice";
import filterSlice from "./slices/filterSlice";
import authSlice from "./data/authSlice";
import singlePostSlice from "./data/singlePostSlice";
import commentsSlice from "./data/commentsSlice";

const store = configureStore({
  reducer: {
    IsLoading: loadingSlice,
    Select: toggleSelectButton,
    Posts: postsSlice,
    Favs: favsSlice,
    Filter: filterSlice,
    Single: singlePostSlice,
    Auth: authSlice,
    Comments: commentsSlice,
  },
});

export default store;
