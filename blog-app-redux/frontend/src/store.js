import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogReducer from "./reducers/blogSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userSlice,
  },
});

export default store;
