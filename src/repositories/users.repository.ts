import type { CreateUserRequestDto, UserResponseDto } from '../modules/users/dto'

const users: UserResponseDto[] = [{ id: 1, email: 'default@example.com', name: 'Default User' }]

class UsersRepository {
  async create(data: CreateUserRequestDto): Promise<UserResponseDto> {
    await new Promise((resolve) => setTimeout(resolve, 10))
    const newUser: UserResponseDto = {
      id: Date.now(),
      email: data.email,
      name: data.name,
    }
    users.push(newUser)
    return newUser
  }

  async findAll(): Promise<UserResponseDto[]> {
    await new Promise((resolve) => setTimeout(resolve, 10))
    return users
  }
}

export const usersRepository = new UsersRepository()
