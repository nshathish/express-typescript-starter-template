import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: {
      code: 404,
      description: 'The requested route does not exist',
    },
  });
};

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: {
      code: 500,
      description: err.message,
    },
  });
};
