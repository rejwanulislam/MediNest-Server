import { Request, Response, NextFunction } from 'express';

import { ZodError } from 'zod';
import { Prisma } from '../../generated/prisma/client';
import { AppError } from './AppError';
import { handlePrismaError } from './PrismaError';
import { handleStripeError } from './stripeError';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  } else if (err && typeof err === 'object' && 'type' in err && typeof err.type === 'string' && err.type.startsWith('Stripe')) {
    error = handleStripeError(err);
  } else if (err instanceof ZodError) {
    error = new AppError('Data verification failed', 422, err.flatten().fieldErrors as Record<string, string[]>);
  } else if (err instanceof Error) {
    error = new AppError(err.message, 500);
  } else {
    error = new AppError('An unknown problem has occurred', 500);
  }

  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && error.statusCode === 500) {
    error = new AppError('There is a problem with the server', 500);
  }

  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    ...(error.errors && { errors: error.errors }),
    ...(!isProd && { stack: error.stack }),
  });
}
