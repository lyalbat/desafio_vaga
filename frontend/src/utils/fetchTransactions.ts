export const fetchTransactions = async (page: number, limit: number) => {
    const response = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };
  