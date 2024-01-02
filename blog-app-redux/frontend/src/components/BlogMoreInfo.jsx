import { Button } from "react-bootstrap";

const BlogMoreInfo = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      {`Likes: ${blog.likes}`} <Button onClick={handleLikeBlog}>like</Button>
      {user.username === blog.author && (
        <Button id="remove-btn" onClick={handleRemoveBlog}>
          remove
        </Button>
      )}
    </div>
  );
};

export default BlogMoreInfo;
