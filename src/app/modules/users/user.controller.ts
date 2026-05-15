import type { TRequest, TResponse } from "../../../shared/types/express.types";
import {
  asyncHandler,
  sendResponse,
  AppError,
} from "../../../shared/utils/utils";
import { UserServices } from "./user.service";
import { validateCreateUser } from "./user.validation";

//POST users
const createUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const validation = validateCreateUser(req.body);

  if (!validation.success) {
    throw new AppError(validation.message, 400);
  }

  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse({
    res,
    success: true,
    message: "User Created Successfully",
    data: result,
    status: 201,
  });
});

//GET users
const getAllUsers = asyncHandler(async (req: TRequest, res: TResponse) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse({
    res,
    success: true,
    message: "User Fetched Successfully",
    data: result,
    status: 200,
  });
});

//GET single users
const getSingleUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id as string);
  if (!result) throw new AppError("User not found", 404);

  sendResponse({
    res,
    success: true,
    message: "User Fetched Successfully",
    data: result,
    status: 200,
  });
});

//UPDATE users
const updateUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await UserServices.updateUserInDB(id as string, req.body);
  if (!result) throw new AppError("User not found", 404);
  sendResponse({
    res,
    success: true,
    message: "User Updated Successfully",
    data: result,
    status: 200,
  });
});

//DELETE users
const deleteUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserFromDB(id as string);
  if (!result) throw new AppError("User not found", 404);
  sendResponse({
    res,
    success: true,
    message: "User Deleted Successfully",
    data: result,
    status: 200,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
