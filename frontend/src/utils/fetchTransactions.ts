export const fetchAllTransactions = async (page: number, limit: number) => {
    const response = await fetch(`/api/getTransactions?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };
  