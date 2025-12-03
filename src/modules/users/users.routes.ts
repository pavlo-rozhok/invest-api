import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { usersService } from './users.service';
import { userResponseSchema } from './dto/response/user.response.dto';
import { createUserRequestSchema } from './dto/request/create-user.request.dto';
import { zodErrorHook } from '../../common/error-handling/zod-error.hook';

export const usersRoutes = new OpenAPIHono({ defaultHook: zodErrorHook });

const CONTROLLER_TAG = 'Users';

usersRoutes.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.array(userResponseSchema),
          },
        },
        description: 'Retrieve a list of users',
      },
    },
    tags: [CONTROLLER_TAG],
  }),
  async (c) => {
    await new Promise((res) => setTimeout(res, 1000));
    const users = await usersService.getAll();
    return c.json(users);
  },
);

usersRoutes.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: userResponseSchema,
          },
        },
        description: 'User successfully created',
      },
      400: {
        description: 'Invalid input',
      },
    },
    tags: [CONTROLLER_TAG],
  }),
  async (c) => {
    await new Promise((res) => setTimeout(res, 1000));
    const data = c.req.valid('json');
    const created = await usersService.create(data);
    return c.json(created, 201);
  },
);
