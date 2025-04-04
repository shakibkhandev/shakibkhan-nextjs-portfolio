import { errorHandler } from "../middlewares/error.middlewares";
/**
 * @description Common Error class to throw an error from anywhere.
 * The {@link errorHandler} middleware will catch this error at the central place and it will return an appropriate response to the client
 */

class ApiError extends Error {
  statusCode: number;
  data: any | null;
  success: boolean;
  errors: any[];
  hints?: string;
  traceId?: string;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = "",
    hints?: string,
    traceId?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.hints = hints;
    this.traceId = traceId;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };