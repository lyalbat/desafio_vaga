import { Filters } from "../interfaces/filters";
import { Transaction } from "../interfaces/transaction";
import { TransactionModel } from "../models/transaction";

export const fetchTransactionsRepository = async (
  skipValue: number,
  limit: number,
  filter: Filters | null
) => {
  const query = getQuery(filter);
  const transactions = await TransactionModel.find(query)
    .sort({ data: -1 })
    .skip(skipValue)
    .limit(limit);
  const totalCount = await TransactionModel.countDocuments(query);

  return {
    transactions,
    total: totalCount,
  };
};

export const saveBatchTransactions = async (
  transactions: Array<Transaction>
) => {
  try{
    return await TransactionModel.insertMany(transactions, { ordered: false });
  }
  catch(error:any){
    const duplicatedError = /E11000 duplicate key error collection/
    if (duplicatedError.test(error)) return
    throw new Error("Failed to insert transactions. Error: " + error)
  }
};

const getQuery = (filter: Filters | null) => {
  if (!filter) return {};
  if (isNaN(Number(filter.value))) {
    return { [filter.key]: { $regex: filter?.value, $options: "i" } };
  }
  return { [filter.key]: filter.value };
};
