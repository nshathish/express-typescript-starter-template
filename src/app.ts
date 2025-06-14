import cors from 'cors';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import userRouter from '@/routes/user.route';

import { errorHandler, notFoundHandler } from '@/middlewares/error.middleware';

import swaggerSpec from '@/config/swagger';

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.setMiddlewares();
    this.setRoutes();
    this.setupSwagger();
    this.setErrorHandlers();
  }

  private setMiddlewares(): void {
    // this.app.use(express.static(path.join(__dirname, '../public')));
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

  private setupSwagger(): void {
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: 'API Documentation',
      }),
    );
  }
}

export default new App().app;
