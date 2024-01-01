import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const User = ({ users }) => {
  const style = {
    margin: "10px",
  };
  const { id } = useParams();
  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={style}>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.map((blog) => (
        <div key={blog.id}> - {blog.title}</div>
      ))}
    </div>
  );
};

User.propTypes = {
  users: PropTypes.array.isRequired,
};

export default User;
