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

export const bulkInsertTransactions = async (usersRaw: BufferUserData) => {
  const userList: User[] = [];

  for (let i = 0; i < usersRaw.names.length; i++) {
    userList.push({
      nome: usersRaw.names[i],
      cpfCnpj: Number(usersRaw.documents[i]),
    });
  }
  try {
    const saveResult = await saveBatchUsers(userList);
    return {
      message: "Bulk insert successful",
      count: saveResult.length,
      stackTrace: saveResult,
    };
  } catch (error) {
    console.error("Bulk insert error:", error);
  }
};
