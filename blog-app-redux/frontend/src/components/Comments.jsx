import { useState } from "react";
import blogsServices from "../services/blogs";

const Comments = ({ blog }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(blog.comments);

  const addCommentHandle = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        content: content,
      };

      const user = await blogsServices.addComment(blog.id, newComment);

      setComments(comments.concat(newComment));

      setContent("");
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={addCommentHandle}>
        <input
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {comments.map(
        (comment, index) =>
          comment && <div key={comment._id || index}> - {comment.content}</div>
      )}
    </>
  );
};

export default Comments;
