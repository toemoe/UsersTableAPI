import { useState } from "react";
import type { FC } from "react";
import type { User } from "../../types/types";
import styles from './UserForm.module.css'

interface UserFormProps {
  userData?: Partial<User>;
  groups: { id: number; name: string }[];
  onSubmit: (data: { name: string; email: string; phone: string; group: string }) => void;
  onCancel?: () => void;
}

const UserForm: FC<UserFormProps> = ({ userData = {}, groups, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userData.name ?? "",
    email: userData.email ?? "",
    phone: userData.phone ?? "",
    group: userData.group?.name ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <label>
        Name: <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email: <input name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Phone: <input name="phone" value={formData.phone} onChange={handleChange} />
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default UserForm;
