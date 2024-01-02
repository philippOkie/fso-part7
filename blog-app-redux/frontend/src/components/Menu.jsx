import Notification from "./Notification";

import { Button } from "react-bootstrap";

const Menu = ({ handleLogout, user, blogForm }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <a href="/users" style={padding}>
        Users
      </a>
      <a href="/blogs" style={padding}>
        Blogs
      </a>

      <div>
        {user.name} logged in{" "}
        <Button variant="danger" onClick={handleLogout}>
          logout
        </Button>
        {blogForm()}
      </div>
    </div>
  );
};

export default Menu;
