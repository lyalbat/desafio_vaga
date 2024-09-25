// @ts-nocheck
import FormData from 'form-data';

type transactionData = {
  file: ArrayBuffer;
  fileName: string;
};
export const fetchAllTransactions = async (page: number, limit: number) => {
  const response = await fetch(
    `/api/getTransactions?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};
export async function addTransactionsFile(data: transactionData) {
  const nodeBuffer = Buffer.from(data.file);
  const form = new FormData();
    form.append("file",new Blob([nodeBuffer]), data.fileName);
  
  const url = `api/saveTransactions`;
  return await fetch(url, {
    method: "POST",
    body: form,
  });
}
export const searchTransactions = async (
  page: number,
  limit: number,
  filterKey: string,
  filterValue: string
) => {
  const response = await fetch(
    `/api/getTransactions?page=${page}&limit=${limit}&filterKey=${filterKey}&filterValue=${filterValue}`
  );
  const data = await response.json();
  return data;
};
3;
