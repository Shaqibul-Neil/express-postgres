import type { TResponse } from "../types/express.types";

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

export const sendResponse = <T>({
  res,
  data,
  message = "Success",
  status = 200,
  meta,
}: TSendResponse<T>) => {
  return res.status(status).json({
    success: true,
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
