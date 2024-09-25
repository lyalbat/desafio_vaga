import { Filters } from "../interfaces/filters";
import { User } from "../interfaces/user";
import { fetchUsersRepository, saveBatchUsers } from "../repository/users";
import { BufferUserData } from "../utils/checkUserDuplicatesInBuffer";
import { fetchDataFactory } from "./factory/fetchDataFactory";

export const fetchUsers = async (
  page: number,
  limit: number,
  filter: Filters | null
) => {
  return await fetchDataFactory(
    page,
    limit,
    filter,
    fetchUsersRepository,
    'users'
  );
};

export const bulkInsertUsers= async (usersRaw: BufferUserData[]) => {
  const userList: User[] = [];

  for (let i = 0; i < usersRaw.length; i++) {
    userList.push({
      nome: usersRaw[i].names[0],
      cpfCnpj: Number(usersRaw[i].documents[0]),
    });
  }
  try {
    const saveResult = await saveBatchUsers(userList);
    if(!saveResult) return {
      message: "Bulk insert successful",
      stackTrace: saveResult,
    }
    return {
      message: "Bulk insert successful",
      count: saveResult.length,
      stackTrace: saveResult,
    };
  } catch (error) {
    console.error("Bulk insert error:", error);
  }
};
