import { Sequelize } from 'sequelize';

import logger from '@/config/logger';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'Password123!',
  database: process.env.DB_NAME || 'orders_db',
  logging: false,
});

export const initializeDatabase = async () => {
  await sequelize.authenticate();
  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: true });
    logger.info('🚀 Connected to MySQL');
  } else {
    logger.warn('⚠️ Skipping database schema synchronization in production. Use a migration tool.');
  }
};

export default sequelize;
