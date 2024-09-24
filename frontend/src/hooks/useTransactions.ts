import { useState, useEffect } from "react";
import { fetchAllTransactions } from "../utils/transactions";
import { Transaction } from "../interfaces/transaction";

const ITEMS_PER_PAGE = 2;

export const useTransactions = (currentPage: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchAllTransactions(currentPage, ITEMS_PER_PAGE);
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    
    loadTransactions();
  }, [currentPage]);

  return { transactions, totalPages };
};
