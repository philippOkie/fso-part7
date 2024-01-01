import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { setUser, clearUser } from "./reducers/userSlice";
import {
  setBlogs,
  appendBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blogSlice";

import Blog from "./components/Blog";
import BlogMoreInfo from "./components/BlogMoreInfo";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import PropTypes from "prop-types";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    };

    fetchBlogs();
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
  const blogRef = useRef();

  const green = {
    color: "green",
    border: "green 2px solid",
  };

  const red = {
    color: "red",
    border: "red 2px solid",
  };

  const blogStyle = {
    border: "solid 1px black",
    height: "auto",
    margin: "0.5%",
    display: "flex",
    flexDirection: "column",
  };

  const handleLikeBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
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
        <Notification message={notification} />
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
          <h2>blogs</h2>
          <Notification message={notification} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map((blog) => (
            <div className="blog-info" key={blog.id} style={blogStyle}>
              <Blog blog={blog} />
              <Togglable buttonLabel="view" ref={blogRef}>
                <BlogMoreInfo
                  user={user}
                  blog={blog}
                  handleLikeBlog={() => handleLikeBlog(blog.id)}
                  handleRemoveBlog={() => handleRemoveBlog(blog.id)}
                />
              </Togglable>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
