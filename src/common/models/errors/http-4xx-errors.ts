import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class Http4xxError extends Error {
  public status: ContentfulStatusCode;

  constructor(status: ContentfulStatusCode, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Http4xxError);
    }
  }
}

export class BadRequestError extends Http4xxError {
  constructor(message = 'Invalid request') {
    super(400, message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Http4xxError {
  constructor(message = 'Authentication required') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Http4xxError {
  constructor(message = 'Access forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Http4xxError {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}
