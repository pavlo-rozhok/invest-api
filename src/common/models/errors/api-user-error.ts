import { errorMessages } from '../../error-handling/error-messages';
import { ErrorCodesEnum } from '../enums/error-codes.enum';

export class ApiUserError {
  errorCode: ErrorCodesEnum;
  message: string;
  details?: object;

  constructor({
    errorCode = ErrorCodesEnum.INTERNAL_SERVER_ERROR,
    message = '',
    details = undefined,
  }: {
    errorCode?: ErrorCodesEnum;
    message?: string;
    details?: object;
  } = {}) {
    this.errorCode = errorCode;
    this.message = message || errorMessages[errorCode];
    this.details = details;
  }
}
