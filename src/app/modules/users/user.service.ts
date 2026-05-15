import type { IUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB = async (payload: IUser) => {
  const result = await UserModel.createUser(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.getAllUsers();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.getSingleUser(id);
  return result;
};

const updateUserInDB = async (id: string, payload: Partial<IUser>) => {
  const result = await UserModel.updateUser(id, payload);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.deleteUser(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
