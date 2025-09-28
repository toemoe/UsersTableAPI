import type { User } from "../../../types/types.ts";

interface TableDisplayProps {
  visibleUsers: User[];
  openUserInfo: (id: number) => void;
}

const TableDisplay = ({visibleUsers, openUserInfo}: TableDisplayProps) => {
  return (
    <table>
      <thead>
        <tr><th>№</th><th>Name</th><th>Group</th></tr>
      </thead>
      <tbody>
        {visibleUsers.map((user, index) => (
          <tr key={user.id} onClick={() => openUserInfo(user.id)}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.group?.name === undefined ? "none" : user.group?.name}</td>
          </tr>
        ))}
      </tbody>
  </table>
  )
}

export default TableDisplay