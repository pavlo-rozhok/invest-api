import { z } from 'zod'

export const userResponseSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    email: z.email().openapi({ example: 'test@example.com' }),
    name: z.string().openapi({ example: 'John Doe' }),
  })
  .openapi('UserResponseDto')

export type UserResponseDto = z.infer<typeof userResponseSchema>
