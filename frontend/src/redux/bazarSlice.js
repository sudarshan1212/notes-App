import { createSlice } from "@reduxjs/toolkit";
const initialState = { userInfo: null, noteList: [] };
export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.userInfo = action.payload;
      // console.log(state.userInfo);
    },
    removeUsers: (state, action) => {
      state.userInfo = null;
    },
  },
});
export const { addUsers, removeUsers } = bazarSlice.actions;
export default bazarSlice.reducer;
