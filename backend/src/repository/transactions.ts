import { Filters } from "../interfaces/filters";
import { Transaction } from "../interfaces/transaction";
import { TransactionModel } from "../models/transaction";

export const fetchTransactionsRepository = async (
  skipValue: number,
  limit: number,
  filter: Filters | null
) => {
  const query = getQuery(filter)
  console.log("transactions got this: ", query)
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
  return await TransactionModel.insertMany(transactions);
};

const getQuery = (filter: Filters | null) => {
  if(!filter) return {}
  if(isNaN(Number(filter.value))){
    return { [filter.key]: { $regex: filter?.value, $options: "i" } }
  }
  return {[filter.key]: filter.value}
};
