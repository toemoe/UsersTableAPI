import { MapUsers } from "../utils/utils"
import type { User } from "../types/types"

const apiUrl = import.meta.env.VITE_API_URL

export async function fetchUsers() {
  const res = await fetch(`${apiUrl}/users`)
  return res.json()
}

export async function fetchUser(id: string) {
  const res = await fetch(`${apiUrl}/users/${id}`)
  return res.json()
}

export async function fetchUserById(id: number): Promise<User> {
  const [user, groups] = await Promise.all([fetchUser(id.toString()), fetchGroups()]);
  const mappedUsers = MapUsers([user], groups);
  return mappedUsers[0];
}

export async function fetchGroups() {
  const res = await fetch(`${apiUrl}/groups`)
  return res.json()
}

export async function fetchUsersWithGroups(): Promise<User[]> {
  const [users, groups] = await Promise.all([fetchUsers(), fetchGroups()])
  return MapUsers(users, groups)
}

export async function updateUserById(id: number, data: Partial<User>): Promise<User> {
  const result = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!result.ok) {
    throw new Error(
      `Failed to update user with id ${id}: ${result.statusText}`
    );
  }
  return result.json()
}