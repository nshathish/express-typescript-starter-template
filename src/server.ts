import app from '@/app';
import logger from '@/config/logger';
import { connectDB } from '@/config/db';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  logger.error('Error starting the server:', err);
  process.exit(1);
});
