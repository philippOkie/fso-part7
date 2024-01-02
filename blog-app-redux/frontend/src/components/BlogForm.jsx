import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setAuthor] = useState("");
  const [newTitle, setTitle] = useState("");
  const [newUrl, setUrl] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setAuthor(user.username);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setAuthor(user.username);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <div>
      <h3>create a new blog</h3>
      <Form onSubmit={addBlog}>
        title:
        <input
          id="title"
          aria-label="title:"
          value={newTitle}
          onChange={handleTitleChange}
        />
        url:
        <input
          id="url"
          aria-label="url:"
          value={newUrl}
          onChange={handleUrlChange}
        />
        <Button id="create-blog" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
