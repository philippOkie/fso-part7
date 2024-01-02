import { useState } from "react";
import blogsServices from "../services/blogs";
import { Form, Button } from "react-bootstrap";

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
      <Form onSubmit={addCommentHandle}>
        <input
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />{" "}
        <Button variant="success" type="submit">
          add comment
        </Button>
      </Form>
      {comments.map(
        (comment, index) =>
          comment && <div key={comment._id || index}> - {comment.content}</div>
      )}
    </>
  );
};

export default Comments;
