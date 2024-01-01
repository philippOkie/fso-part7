import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      const sortedBlogs = [...action.payload].sort((a, b) =>
        b.likes > a.likes ? 1 : a.likes > b.likes ? -1 : 0
      );

      return sortedBlogs;
    },

    appendBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => {
      const blogToChange = state.find((b) => b.id === action.payload);
      blogToChange.likes += 1;
    },
    removeBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload),
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
