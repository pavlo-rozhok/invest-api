import { v4 as uuidv4 } from 'uuid';
import { createMiddleware } from 'hono/factory';

export const requestIdMiddleware = createMiddleware(async (c, next) => {
  const requestId = uuidv4();
  c.set('requestId', requestId);
  c.res.headers.set('X-Request-ID', requestId);
  await next();
});

declare module 'hono' {
  interface ContextVariableMap {
    requestId: string;
  }
}
