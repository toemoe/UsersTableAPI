import type { User } from "../../../types/types.ts";
import styles from '../Content.module.css'

interface TableDisplayProps {
  visibleUsers: User[];
  openUserInfo: (id: number) => void;
}

const TableDisplay = ({visibleUsers, openUserInfo}: TableDisplayProps) => {
  return (
    <div className={styles.cards}>
    {visibleUsers.map((user, index) => (
      <div className={styles.card} key={user.id} onClick={() => openUserInfo(user.id)}>
        <div><strong>ID:</strong> {index + 1}</div>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Group:</strong> {user.group?.name ?? "none"}</div>
      </div>
    ))}
  </div>
  )
}

export default TableDisplay