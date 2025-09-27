import { fetchGroups } from '../models/group.js'

export const getGroups = async (req, res, next) => {
  try {
    const groups = await fetchGroups()
    res.json(groups)
  } catch (error) { next(error) }
}

export const getGroupById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const groups = await fetchGroups();
    const group = groups.find(g => g.id === id);

    if (!group) return res.status(404).json({ error: `Group with id ${id} not found` });

    res.json(group);
  } catch (error) {
    next(error);
  }
}