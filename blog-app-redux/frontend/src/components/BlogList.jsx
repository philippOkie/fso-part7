import React from "react";
import { useRef } from "react";

import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const blogRef = useRef();

  return (
    <div>
      {blogs.map((blog) => (
        <div className="blog-info" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
