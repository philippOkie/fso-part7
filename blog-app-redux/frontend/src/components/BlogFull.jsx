import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateBlog } from "../reducers/blogSlice";
import { notify } from "../reducers/notificationSlice";

import blogService from "../services/blogs";

import Comments from "../components/Comments";

import { Alert, Button, Card } from "react-bootstrap";

const BlogFull = ({ blogs, handleRemoveBlog, user }) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const blog = blogs.find((b) => String(b.id) === String(id));

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

  if (!blog) {
    return <Alert variant="danger">Blog not found</Alert>;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <h2>{blog.title}</h2>
      <p>added by {blog.author}</p>
      <p>{blog.url}</p>
      {`Likes: ${blog.likes}`}{" "}
      <Button onClick={() => handleLikeBlog(blog.id)}>like</Button>{" "}
      {user.username === blog.author && (
        <Button variant="danger" id="remove-btn" onClick={handleRemoveBlog}>
          remove
        </Button>
      )}
      <Comments blog={blog} />
    </Card>
  );
};

export default BlogFull;
