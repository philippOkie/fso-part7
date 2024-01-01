import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userSlice,
  },
});

console.log(store.getState());

export default store;
