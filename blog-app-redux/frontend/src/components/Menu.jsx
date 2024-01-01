import Notification from "./Notification";

const Menu = ({ handleLogout, user, blogForm }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <a href="/users" style={padding}>
        users
      </a>
      <a href="/blogs" style={padding}>
        blogs
      </a>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        {blogForm()}
      </div>
    </div>
  );
};

export default Menu;
