import type { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import type { UserResponseDto } from './dto/response/user.response.dto';
import { usersRepository } from '../../repositories/users.repository';
import { ApiError } from '../../common/models/errors/api-error';

export class UsersService {
  public getAll = async (): Promise<UserResponseDto[]> => {
    // await new Promise((res) => setTimeout(res, 1000));
    throw new ApiError({ message: 'Custom Error Message', statusCode: 401 });
    // throw new Error('qwd');
    return usersRepository.findAll();
  };

  public create = async (data: CreateUserRequestDto): Promise<UserResponseDto> => {
    return usersRepository.create(data);
  };
}

export const usersService = new UsersService();
