import mysql from 'mysql2/promise';

import logger from '@/config/logger';

export let db: mysql.Connection;

export async function connectDB(): Promise<void> {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'app_user',
      password: process.env.DB_PASSWORD || 'Password123!',
      database: process.env.DB_NAME || 'orders_db',
    });
    logger.info('[✓] Connected to MySQL');
  } catch (err) {
    logger.error('[✗] MySQL connection failed:', err);
    process.exit(1);
  }
}
