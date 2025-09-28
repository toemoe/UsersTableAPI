import type { UserDTO, Group, User } from "../types/types";

export function MapUsers(users: UserDTO[], groups: Group[]): User[] {
  const groupMap = new Map<number, Group>(
    groups.map(group => [group.id, group])
  )

  return users.map(user => ({
    ...user,
    group: user.group_id ? groupMap.get(user.group_id) : undefined
  }))
}