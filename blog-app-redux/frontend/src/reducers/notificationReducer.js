// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: () => "",
  },
});

export const notify = (content, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
