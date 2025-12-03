import type { Hook } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { ZodError } from 'zod';

import { BadRequestError } from '../models/errors/http-4xx-errors';

export const zodErrorHook: Hook<unknown, Env, string, unknown> = (result) => {
  if (!result.success && result.error instanceof ZodError) {
    throw new BadRequestError(result.error);
  }

  return undefined;
};
