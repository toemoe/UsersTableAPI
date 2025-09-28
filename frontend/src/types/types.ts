export interface UserDTO {
  id: number
  name: string
  email: string
  phone?: string
  group_id?: number
}

export interface Group {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  group?: Group
}