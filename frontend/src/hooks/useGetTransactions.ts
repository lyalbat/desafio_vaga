import { useState, useEffect } from "react";
import { fetchAllTransactions } from "../utils/transactions";
import { Transaction } from "../interfaces/transaction";

export const useGetAllTransactions = (currentPage: number, ITEMS_PER_PAGE: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchAllTransactions(currentPage, ITEMS_PER_PAGE);
        setTransactions(data.transactions);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [currentPage]);
  return { transactions, totalPages, loading };
};
