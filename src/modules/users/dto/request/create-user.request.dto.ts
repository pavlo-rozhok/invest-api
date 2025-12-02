import { z } from 'zod';

export const createUserRequestSchema = z
  .object({
    email: z.email().openapi({ example: 'test@example.com' }),
    name: z.string().min(3).openapi({ example: 'John Doe' }),
  })
  .openapi('CreateUserRequestDto');

export type CreateUserRequestDto = z.infer<typeof createUserRequestSchema>;
