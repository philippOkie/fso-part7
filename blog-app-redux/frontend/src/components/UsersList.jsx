import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const UsersList = ({ users }) => (
  <div>
    <h2>Users</h2>

    <Table striped>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link> amount of
              blogs {user.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default UsersList;
