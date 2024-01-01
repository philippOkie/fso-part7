import { Link } from "react-router-dom";

const UsersList = ({ users }) => (
  <div>
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <div>
            <Link to={`/users/${user.id}`}>{user.username}</Link> amount of
            blogs {user.blogs.length}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UsersList;
