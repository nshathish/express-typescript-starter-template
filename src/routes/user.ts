import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';

import { db } from '@/config/db';

const router = Router();

router.get('/', async (_, res) => {
  const [results, _fields] = await db.query('SELECT * FROM users');
  res.json(results);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log('db', db);
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;
