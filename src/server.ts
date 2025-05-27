import app from '@/app';
import { connectDB } from '@/config/db';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
