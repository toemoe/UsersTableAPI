import { useEffect, useState } from "react";
import type { User } from "../../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { fetchUsersWithGroups } from "../../../services/users.ts";
import Filter from "../../Content/Filter/Filter";
import TableDisplay from "./TableDisplay";
import CardsDisplay from "./CardsDisplay";

interface UserTableProps {
  visibleCount: number;
}

const UserTable = ({visibleCount}: UserTableProps) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const visibleUsers = filteredUsers.slice(0, visibleCount);

  useEffect(() => {
    fetchUsersWithGroups().then(users => {
      setUsers(users);
      setFilteredUsers(users);
    });
  }, []);

  const openUserInfo = (id: number) => {
    navigate(`/users/${id}`);
  }

  useEffect(() => {
    const filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(nameFilter.toLocaleLowerCase())
      const groupMatch = groupFilter
      ? (user.group?.name ?? "none").toLowerCase().includes(groupFilter.toLocaleLowerCase())
      : true
      return nameMatch && groupMatch
    }).sort((a , b) => a.id - b.id);
    setFilteredUsers(filtered);
  }, [nameFilter, groupFilter, users]);

  return (
    <>
    <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} groupFilter={groupFilter} setGroupFilter={setGroupFilter} />
      <TableDisplay visibleUsers={visibleUsers} openUserInfo={openUserInfo} />  {/* For Desktop */}
      <CardsDisplay visibleUsers={visibleUsers} openUserInfo={openUserInfo} />  {/* For Mobile */}
    </>
  );
};

export default UserTable;