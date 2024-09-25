import fs from "fs";
import readline from "readline";
import { formatBufferTransaction } from "../utils/formatBufferTransaction";
import { Filters } from "../interfaces/filters";
import {
  fetchTransactionsRepository,
  saveBatchTransactions,
} from "../repository/transactions";
import { fetchDataFactory } from "./factory/fetchDataFactory";
import { BufferUserData, checkUserDuplicatesInBuffer } from "../utils/checkUserDuplicatesInBuffer";
import { bulkInsertUsers } from "./users";

export const bulkInsertTransactions = async (filePath: string) => {
  let results = new Array();
  let userNames = new Array();
  let userDocuments = new Array();
  const fileStream = fs.createReadStream(filePath);
  let users: BufferUserData[] = [];

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const transaction = formatBufferTransaction(line);
    results.push(transaction);
    userNames.push(transaction?.nome)
    userDocuments.push(transaction?.cpfCnpj)
  }
  try {
    const saveResult = await saveBatchTransactions(results);
    users.push({ names: userNames, documents: userDocuments });
    try{
      const leanUserList = checkUserDuplicatesInBuffer(users)
      bulkInsertUsers(leanUserList)
    }catch(error:any){
      console.error("User bulk insert error:", error);
    }
    return {
      message: "Bulk insert successful",
      count: results.length,
      stackTrace: saveResult,
    };
  } catch (error) {
    console.error("Bulk insert error:", error);
  } finally {
    fs.unlinkSync(filePath);
  }
};

export const fetchTransactions = async (
  page: number,
  limit: number,
  filter: Filters | null
) => {
  return await fetchDataFactory(
    page,
    limit,
    filter,
    fetchTransactionsRepository,
    'transactions'
  );
};
