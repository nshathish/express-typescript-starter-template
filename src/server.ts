import app from '@/app';

import { initializeDatabase } from '@/config/database';

import logger from '@/config/logger';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  await initializeDatabase();

  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}!`);
  });
}

bootstrap().catch((err) => {
  logger.error('Error starting the server:', err);
  process.exit(1);
});
