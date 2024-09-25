import { Filters } from "../interfaces/filters";
import { User } from "../interfaces/user";
import { UserModel } from "../models/user";

export const fetchUsersRepository = async (
  skipValue: number,
  limit: number,
  filter: Filters | null
) => {
  const query = !filter
    ? {}
    : { [filter.key]: { $regex: filter?.value, $options: "i" } };
  const users = await UserModel.find(query).skip(skipValue).limit(limit);
  const totalCount = await UserModel.countDocuments(query);

  return {
    users,
    total: totalCount,
  };
};

export const saveBatchUsers = async (users: Array<User>) => {
  try {
    return await UserModel.insertMany(users, { ordered: false });
  } catch (error: any) {
    const duplicatedError = /E11000 duplicate key error collection/;
    if (duplicatedError.test(error)) return;
    throw new Error("Failed to insert users. Error: " + error);
  }
};
