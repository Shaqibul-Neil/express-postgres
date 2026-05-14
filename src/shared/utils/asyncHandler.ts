import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";

type TController = (req: TRequest, res: TResponse) => Promise<void>;
export const asyncHandler = (controller: TController) => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

/**
 * HYBRID model
 * Controller sends data
 * async handler sends response with wrapper
 * Return-driven architecture with centralized response layer
 

type TController<T> = (req: TRequest, res: TResponse) => Promise<T>;

export const asyncHandler = <T>(controller: TController<T>) => {
  return async (req: TRequest, res: TResponse, next: TNextFunction) => {
    try {
      const result = await controller(req, res);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
};
*/
