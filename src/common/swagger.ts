import { swaggerUI } from '@hono/swagger-ui';
import type { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';

export const addSwaggerEndPoints = (app: OpenAPIHono<Env>) => {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Invest API',
      description: 'Invest API Documentation',
    },
  });

  app.get('/ui', swaggerUI({ url: '/doc', tagsSorter: `(a, b) => a.localeCompare(b)` }));
};
