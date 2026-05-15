import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";

type TController = (req: TRequest, res: TResponse) => Promise<void>;
type TApiResponse<T> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
};

type TSendResponse<T> = TApiResponse<T> & {
  res: TResponse;
};

//Async Handler
export const asyncHandler = (controller: TController) => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

//Send Response
export const sendResponse = <T>({
  res,
  success = true,
  data,
  message = "Success",
  status = 200,
  meta,
}: TSendResponse<T>) => {
  return res.status(status).json({
    success,
    message,
    data,
    meta,
  });
};

/**
 * Class Based Approach
 */

class ApiResponse<T> {
  constructor(
    public data: T,
    public message: "Success",
  ) {}
}

/**
 * throw AppError
      ↓
    asyncHandler catch
      ↓
    next(error)
      ↓
    globalErrorHandler
      ↓
    JSON response
 */

export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
