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
  return await UserModel.insertMany(users);
};
