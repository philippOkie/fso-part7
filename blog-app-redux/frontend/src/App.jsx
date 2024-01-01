import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { notify } from "./reducers/notificationSlice";
import { setUser, clearUser } from "./reducers/userSlice";
import {
  setBlogs,
  appendBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blogSlice";

import Notification from "./components/Notification";
import BlogFull from "./components/BlogFull";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Menu from "./components/Menu";

import blogService from "./services/blogs";
import userService from "./services/users";
import loginService from "./services/login";
import UsersList from "./components/UsersList";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLikeBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);

      if (!blog) {
        console.error(`Blog with id ${id} not found`);
        return;
      }

      const changedBlog = { ...blog, likes: blog.likes + 1 };

      const returnedBlog = await blogService.update(id, changedBlog);

      dispatch(updateBlog(blog.id));

      dispatch(notify(`Liked blog: ${returnedBlog.title}`, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    if (window.confirm("Remove blog, are you sure want to remove it?")) {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(notify(`blog ${blog.title} was deleted`, 3));
    } else {
      return;
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notify(`wrong username or password`, 3));
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    const returnedBlog = await blogService.create(blogObject);
    dispatch(notify(`Added new blog: ${returnedBlog.title}`, 3));
    dispatch(appendBlog(returnedBlog));
  };

  const handleLogout = () => {
    dispatch(clearUser());
    window.localStorage.clear();
  };

  const handleReset = () => {
    setPassword("");
    setUsername("");
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const loginForm = () => {
    return (
      <>
        <h2>log in to application </h2>
        <Notification />
        <form onSubmit={handleSubmitLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
          <button type="reset" onClick={handleReset}>
            cancel
          </button>
        </form>
      </>
    );
  };

  loginForm.propTypes = {
    handleSubmitLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <Menu user={user} handleLogout={handleLogout} blogForm={blogForm} />

          <Routes>
            <Route
              path="/"
              element={
                <BlogList
                  blogs={blogs}
                  user={user}
                  handleLikeBlog={handleLikeBlog}
                  handleRemoveBlog={handleRemoveBlog}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <BlogList
                  blogs={blogs}
                  user={user}
                  handleLikeBlog={handleLikeBlog}
                  handleRemoveBlog={handleRemoveBlog}
                />
              }
            />
            <Route path="/users" element={<UsersList users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogFull
                  blogs={blogs}
                  handleLikeBlog={handleLikeBlog}
                  handleRemoveBlog={handleRemoveBlog}
                  user={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
