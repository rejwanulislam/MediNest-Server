
import { AppError } from './AppError';

export function handleStripeError(
  err: any
): AppError {
  switch (err.type) {
    case 'StripeCardError':
      return new AppError(err.message ?? 'Card payment failed', 402);

    case 'StripeInvalidRequestError':
      return new AppError('Payment information is incorrect', 400);

    case 'StripeAuthenticationError':
      return new AppError('Payment service is temporarily closed', 503);

    case 'StripeRateLimitError':
      return new AppError('Too many requests, please try again later', 429);

    case 'StripeConnectionError':
    case 'StripeAPIError':
      return new AppError('There was a problem with payment, please try again later.', 502);

    default:
      return new AppError('payment failed', 500);
  }
}