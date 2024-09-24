import { Transaction } from "@/interfaces/transaction";

export const fetchAllTransactions = async (page: number, limit: number) => {
  const response = await fetch(
    `/api/getTransactions?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};

export const addNewTransaction = async (transaction: Transaction) => {
  const url = `/api/addTransaction`;
  const customHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(transaction),
  });
  return response.status;
};
