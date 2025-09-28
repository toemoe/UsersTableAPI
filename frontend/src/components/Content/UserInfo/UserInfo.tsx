import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "../../../types/types";
import { fetchGroups, fetchUserById } from "../../../services/users";
import styles from './UserInfo.module.css';
import { updateUserById } from "../../../services/users";

const UserInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [groups, setGroups] = useState<{id: number, name: string}[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    group: "",
  })

  useEffect(() => {
    fetchGroups().then(setGroups)
  }, []);

  useEffect(() => {
    if (id) {
      fetchUserById(+id).then(user => {
        setUser(user);
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone ?? "",
          group: user.group?.name ?? "",
        })
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleClickEdit = () => { setEdit(true) }

  const handleSave = async () => {
    if (!user) return;

    const updateUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone ? formData.phone : undefined,
    }

    if (formData.group && user.group?.id) {
      updateUser.group = { ...user.group, name: formData.group }
    }

    await updateUserById(updateUser.id, updateUser).then(() => {
      setUser(updateUser)
      setEdit(false);
    })
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      group: user?.group?.name ?? "",
    })
    setEdit(false);
  }


  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.userCard}>
      {edit ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem'}}>
        <label>
          Name: <input name="name" value={formData.name} onChange={handleChange}></input>
        </label>
        <label>
          Email: <input name="email" value={formData.email} onChange={handleChange}></input>
        </label>
        <label>
          Phone: <input name="phone" value={formData.phone} onChange={handleChange}></input>
        </label>
        <label>
          Group:
          <select name="group" value={formData.group} onChange={handleChange}>
            <option value="">none</option>
            {groups.map(group => (
              <option key={group.id}>{group.name}</option>
            ))}
          </select>
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        </div>
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
