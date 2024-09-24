export const fetchAllTransactions = async (page: number, limit: number) => {
  const response = await fetch(
    `/api/getTransactions?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};
type transactionData = {
  file: ArrayBuffer | string;
  fileName: string;
};
export async function addTransactionsFile(data: transactionData) {
  const url = `api/addTransactions`;

  console.log("saiu da addTransactionsFile com: ",data)
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
