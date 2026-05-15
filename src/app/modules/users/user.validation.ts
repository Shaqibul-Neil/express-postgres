import type { IUser } from "./user.interface";

export const validateCreateUser = (payload: IUser) => {
  if (!payload.name || !payload.email || !payload.password) {
    return {
      success: false,
      message: "Required fields missing",
    };
  }
  return {
    success: true,
    message: "Validated",
  };
};
