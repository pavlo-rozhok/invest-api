import type { Context } from 'hono';
import type { HTTPResponseError } from 'hono/types';

import { logger } from '../logging/logger';
import { ApiError } from '../models/errors/api-error';
import { ApiUserError } from '../models/errors/api-user-error';

export const onGlobalError = (err: Error | HTTPResponseError, c: Context) => {
  const isHightLevelNotifying = err instanceof ApiError ? err.isHightLevelNotifying : true;

  const loggerError = {
    path: `${c.req.method}: ${c.req.path}`,
    requestId: c.get('requestId'),
    stack: err.stack,
    ...err,
  };

  if (isHightLevelNotifying) {
    //
  }

  if (err instanceof ApiError && err.statusCode < 500) {
    logger.warn({
      ...loggerError,
      stack: undefined,
    });
  } else {
    logger.error(loggerError);
  }

  if (err instanceof ApiError) {
    return c.json(
      new ApiUserError({
        details: err.userDetails,
        message: err.userMessage,
        errorCode: err.errorCode,
      }),
      err.statusCode,
    );
  }

  return c.json(new ApiUserError(), 500);
};
