import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";
import UserForm from "../UserForm/UserForm";
import { useEffect, useState } from 'react'
import type { User } from '../../types/types.ts'
import { fetchGroups } from '../../services/users';
import { addUser } from "../../services/users.ts";

const Header = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [groups, setGroups] = useState<{id: number, name: string}[]>([]);

  useEffect(() => { fetchGroups().then(setGroups) }, []);
  const handleClickAdd = () => { setAdd(true) }

  const handleSave = async (formData: { name: string; email: string; phone: string; group: string }) => {
    const addNewUser: Partial<User> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }

    if (formData.group) {
      const selectedGroup = groups.find(group => group.name === formData.group)
      addNewUser.group = selectedGroup ?? undefined 
    }

    await addUser(addNewUser as Omit<User, 'id'>)
    .then(() => setAdd(false))
    .catch(error => console.error(error));
  }

  const handleCancel = () => { setAdd(false) }

  const handleClickHeading = () => {
    navigate(`/users/`)
  }

  return (
    <>
    {add &&
    <div className={styles.modalOverlay} onClick={handleCancel}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Add new user</h2>
        <UserForm userData={undefined} groups={groups} onSubmit={handleSave} onCancel={handleCancel} />
      </div>
    </div>
    }
      <header className={styles.Header}>
        <h1 onClick={handleClickHeading}>UserApp</h1>
        <button onClick={handleClickAdd}>Add user</button>
      </header>
    </>
  )
}

export default Header