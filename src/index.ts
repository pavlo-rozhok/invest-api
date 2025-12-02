import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

import { usersRoutes } from './modules/users/users.routes';
import { Http4xxError } from './common/models/errors/http-4xx-errors';
import { config } from './common/config';
import { requestIdMiddleware } from './common/middlewares/request-id.middleware';
import { logMiddleware } from './common/middlewares/logger.middleware';
import { logger } from './common/logging/logger';

const app = new OpenAPIHono();

app.use(requestIdMiddleware);

app.use(
  logMiddleware({
    isEnabled: !config.env.isTest,
    excludePaths: ['/ui', '/doc'],
  }),
);

app.onError((err, c) => {
  if (err instanceof Http4xxError) {
    return c.json(
      {
        message: err.message,
        status: err.status,
        error: err.name,
      },
      err.status,
    );
  }

  logger.error({ code: '123' }, err.message);

  return c.json({ message: 'Internal Server Error' }, 500);
});

app.notFound((c) => {
  return c.json({ message: 'Route not found' }, 404);
});

app.route('/users', usersRoutes);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Invest API',
    description: 'Invest API Documentation',
  },
});

app.get('/ui', swaggerUI({ url: '/doc', tagsSorter: `(a, b) => a.localeCompare(b)` }));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
    console.log(`Swagger UI is available at http://localhost:${info.port}/ui`);
  },
);
