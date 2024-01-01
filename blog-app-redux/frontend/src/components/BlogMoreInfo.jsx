const BlogMoreInfo = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  return (
    <div>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      {`Likes: ${blog.likes}`} <button onClick={handleLikeBlog}>like</button>
      {user.username === blog.author && (
        <button id="remove-btn" onClick={handleRemoveBlog}>
          remove
        </button>
      )}
    </div>
  );
};

export default BlogMoreInfo;
