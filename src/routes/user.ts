import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';

import logger from '@/config/logger';
import { db } from '@/config/db';

const router = Router();

router.get('/', async (_, res) => {
  const [results, _fields] = await db.query('SELECT * FROM users');
  res.json(results);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    logger.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;
