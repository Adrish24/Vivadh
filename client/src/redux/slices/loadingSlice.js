import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
      progress:0
    },
    reducers:{
        setProgress:(state,action) => {
            state.progress = action.payload;
        }
    }
})

export default loadingSlice.reducer;
export const { setProgress } = loadingSlice.actions;