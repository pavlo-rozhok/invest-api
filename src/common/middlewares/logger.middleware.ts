import { createMiddleware } from 'hono/factory';

import { logger } from '../logging/logger';

export const logMiddleware = (options?: { excludePaths?: string[]; isEnabled?: boolean }) => {
  const isEnabled = options?.isEnabled ?? true;
  const excludePaths = options?.excludePaths ?? ['/ui', '/doc'];

  if (!isEnabled) {
    return createMiddleware(async (_c, next) => {
      await next();
    });
  }

  return createMiddleware(async (c, next) => {
    const path = `${c.req.method}: ${c.req.path}`;
    const requestId = c.get('requestId');
    if (excludePaths.includes(path)) {
      return next();
    }

    const start = Date.now();
    logger.info(
      {
        path,
        requestId,
      },
      'Incoming request',
    );

    await next();

    const duration = Date.now() - start;

    logger.info(
      {
        path,
        status: c.res.status,
        durationMs: duration,
        requestId,
      },
      'Request completed',
    );
  });
};
