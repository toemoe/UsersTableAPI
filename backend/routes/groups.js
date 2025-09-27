import express from 'express';
import { getGroups, getGroupById } from '../controllers/groupsController.js'

const router = express.Router();

router.get('/', getGroups);
router.get('/:id', getGroupById);

export default router