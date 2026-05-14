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
