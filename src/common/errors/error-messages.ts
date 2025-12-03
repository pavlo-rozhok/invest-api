import { ErrorCodesEnum } from '../models/enums/error-codes.enum';

export const errorMessages: Record<ErrorCodesEnum, string> = {
  [ErrorCodesEnum.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [ErrorCodesEnum.BAD_REQUEST]: 'Bad Request',
  [ErrorCodesEnum.FORBIDDEN]: 'Access forbidden',
  [ErrorCodesEnum.UNAUTHORIZED]: 'Authentication required',
  [ErrorCodesEnum.NOT_FOUND]: 'Resource not found',
};
