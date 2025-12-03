import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { errorMessages } from '../../error-handling/error-messages';
import { ErrorCodesEnum } from '../enums/error-codes.enum';

export class ApiError extends Error {
  statusCode: ContentfulStatusCode;
  errorCode: ErrorCodesEnum;
  message: string;
  userMessage: string;
  details?: object;
  userDetails?: object;
  isHightLevelNotifying: boolean;

  constructor({
    statusCode = 500,
    errorCode = ErrorCodesEnum.INTERNAL_SERVER_ERROR,
    message = '',
    userMessage = '',
    details = undefined,
    userDetails = undefined,
    isHightLevelNotifying = false,
  }: {
    statusCode?: ContentfulStatusCode;
    errorCode?: ErrorCodesEnum;
    message?: string;
    userMessage?: string;
    isHightLevelNotifying?: boolean;
    details?: object;
    userDetails?: object;
  }) {
    const errorMessage = message || errorMessages[errorCode];
    super(errorMessage);
    this.isHightLevelNotifying = isHightLevelNotifying;

    this.errorCode = errorCode;
    this.statusCode = statusCode;

    this.message = errorMessage;
    this.userMessage = userMessage || errorMessages[errorCode];

    this.details = details;
    this.userDetails = userDetails;
  }
}

export type ApiErrorConstructorArgs = ConstructorParameters<typeof ApiError>[0];
