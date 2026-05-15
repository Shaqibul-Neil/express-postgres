import type { AppError } from "../../shared/utils/utils";
import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../../shared/types/express.types";

export const globalErrorHandler = (
  err: AppError,
  req: TRequest,
  res: TResponse,
  next: TNextFunction,
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
