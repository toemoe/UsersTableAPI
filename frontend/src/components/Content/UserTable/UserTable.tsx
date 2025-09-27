import { fetchUsers } from "../../../services/users";
import { useEffect, useState } from "react";
import type { User } from "../../../types/types.ts";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      }).catch(err => console.error(err));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Group</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.group_id === null ? "none" : user.group_id}</td>
            <td><button>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
