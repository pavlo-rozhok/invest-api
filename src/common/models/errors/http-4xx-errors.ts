import { ErrorCodesEnum } from '../enums/error-codes.enum';
import { ApiError, type ApiErrorConstructorArgs } from './api-error';

export class BadRequestError extends ApiError {
  constructor(userDetails?: object, params: ApiErrorConstructorArgs = {}) {
    super({
      userDetails,
      statusCode: 400,
      errorCode: ErrorCodesEnum.BAD_REQUEST,
      ...params,
    });
  }
}

export class UnauthorizedError extends ApiError {
  constructor(params: ApiErrorConstructorArgs = {}) {
    super({
      statusCode: 401,
      errorCode: ErrorCodesEnum.UNAUTHORIZED,
      ...params,
    });
  }
}

export class ForbiddenError extends ApiError {
  constructor(params: ApiErrorConstructorArgs = {}) {
    super({
      statusCode: 403,
      errorCode: ErrorCodesEnum.FORBIDDEN,
      ...params,
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(params: ApiErrorConstructorArgs = {}) {
    super({
      statusCode: 404,
      errorCode: ErrorCodesEnum.NOT_FOUND,
      ...params,
    });
  }
}
