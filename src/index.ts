import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';

import { usersRoutes } from './modules/users/users.routes';
import { config } from './common/config';
import { requestIdMiddleware } from './common/middlewares/request-id.middleware';
import { logMiddleware } from './common/middlewares/logger.middleware';
import { onGlobalError } from './common/errors/on-global-error';
import { addSwaggerEndPoints } from './common/swagger';

const app = new OpenAPIHono();

app.use(requestIdMiddleware);
app.use(
  logMiddleware({
    isEnabled: !config.env.isTest,
    excludePaths: ['/ui', '/doc'],
  }),
);

app.onError(onGlobalError);
app.notFound((c) => c.json({ message: 'Route not found' }, 404));

app.route('/users', usersRoutes);

addSwaggerEndPoints(app);

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
