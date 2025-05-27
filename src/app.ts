import express, { Express } from 'express';
import cors from 'cors';

import userRouter from '@/routes/user';
import { errorHandler, notFoundHandler } from '@/middlewares/error.middleware';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.setErrorHandlers();
  }

  private setMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setRoutes(): void {
    this.app.get('/health', (_, res) => {
      res.status(200).json({ status: 'OK' });
    });

    // Add more routes here
    this.app.use('/api/v1/users', userRouter);
  }

  private setErrorHandlers(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }
}

export default new App().app;
