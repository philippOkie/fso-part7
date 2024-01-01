import React from "react";
import { useRef } from "react";

import { Link } from "react-router-dom";

import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogMoreInfo from "./BlogMoreInfo";

const BlogList = ({ blogs, user, handleLikeBlog, handleRemoveBlog }) => {
  const blogRef = useRef();

  const blogStyle = {
    border: "solid 1px black",
    height: "auto",
    margin: "0.5%",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-info" key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
