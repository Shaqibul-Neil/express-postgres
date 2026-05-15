import { AppError } from "../../../shared/utils/utils";
import { UserModel } from "./user.model";
import { userValidation, type IUser } from "./user.validation";

const createUserIntoDB = async (payload: IUser) => {
  const validation =
    userValidation.createUserValidationSchema.safeParse(payload);

  if (!validation.success) {
    const errorMessages = validation.error.issues.map((issue) => issue.message);
    throw new AppError(errorMessages.join(", "), 400);
  }

  const result = await UserModel.createUser(validation.data);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.getAllUsers();
  if (!result) throw new AppError("User data not found", 404);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.getSingleUser(id);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

const updateUserInDB = async (id: string, payload: Partial<IUser>) => {
  const result = await UserModel.updateUser(id, payload);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.deleteUser(id);
  if (!result) throw new AppError("User not found", 404);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
