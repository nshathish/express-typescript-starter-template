import { Router } from 'express';

import User from '@/models/user.model';

import logger from '@/config/logger';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
