const apiUrl = import.meta.env.VITE_API_URL

export async function fetchUsers() {
  const res = await fetch(`${apiUrl}/users`)
  return res.json()
}

export async function fetchUser(id: string) {
  const res = await fetch(`${apiUrl}/users/${id}`)
  return res.json()
}

export async function fetchGroups() {
  const res = await fetch(`${apiUrl}/groups`)
  return res.json()
}