import { fetchUsers, fetchUserById, queryInsertUser, queryUpdateUser, queryDeleteUser } from '../models/user.js'


export const getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers()
    res.json(users)
  } catch (error) { next(error) }
}

export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    const result = await fetchUserById(id)

    if (!result) {
      return res.status(404).json({ error: `User with id ${id} not found` })
    }
    res.status(200).json(result)
  } catch (error) { next(error) }
}

export const createUser = async (req, res, next) => {
  try {
    const result = await queryInsertUser(req.body)
    if (result) {
      res.status(201).json({ message: 'User created successfully', user: result })
    } else {
      res.status(400).json({ message: 'Failed to create user' })
    }
  } catch (error) { next(error) }
}


export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const result = await queryUpdateUser(id, req.body)
    if (result) {
      res.status(200).json({ message: 'User updated successfully', user: result })
    } else {
      res.status(400).json({ message: 'Failed to update user' })
    }
  } catch (error) { next(error) }
}

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const result = await queryDeleteUser(id)
    if (result) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(400).json({ message: 'Failed to delete user' })
    }
  } catch (error) { next(error) }
}