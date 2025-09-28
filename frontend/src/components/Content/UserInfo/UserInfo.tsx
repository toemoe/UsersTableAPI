import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../../../types/types";
import { fetchGroups, fetchUserById } from "../../../services/users";
import styles from './UserInfo.module.css';
import { updateUserById } from "../../../services/users";
import UserForm from "../../UserForm/UserForm";

const UserInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [groups, setGroups] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    fetchGroups().then(setGroups)
  }, []);

  useEffect(() => {
    if (id) {
      fetchUserById(+id).then(setUser)
    }
  }, [id]);

  const handleClickEdit = () => { setEdit(true) }

  const handleSave = async (formData: { name: string; email: string; phone: string; group: string }) => {
    if (!user) return;
  
    const updateUser: Partial<User> = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
    };
  
    if (formData.group) {
      const selectedGroup = groups.find(group => group.name === formData.group);
      updateUser.group = selectedGroup ?? undefined;
    } else {
      updateUser.group = undefined;
    }
  
    await updateUserById(user.id, updateUser).then(() => {
      setUser({ ...user, ...updateUser });
      setEdit(false);
    });
  };
  

  const handleCancel = () => { setEdit(false) }


  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.userCard}>
      {edit ? (
      <UserForm userData={user} groups={groups} onSubmit={handleSave} onCancel={handleCancel} />
      ) : (
        <>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone ?? "—"}</p>
        <p>Group: {user.group?.name ?? "none"}</p>
        <button onClick={handleClickEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
