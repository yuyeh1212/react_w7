import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    type: "", // success, error, warning
    visible: false,
  },
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = "";
      state.type = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
