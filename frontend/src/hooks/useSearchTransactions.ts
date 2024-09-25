import { useState, useEffect } from "react";
import { searchTransactions } from "../utils/transactions";
import { Transaction } from "../interfaces/transaction";

export const useSearchTransactions = (initialData: Transaction[], initialTotal: number, items_per_page: number) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const [totalPages, setTotalPages] = useState(initialTotal)
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    query: { filterKey: string; filterValue: string },
    currentPage: number
  ) => {
    setLoading(true);
    try {
      setLoading(true);
      const data = await searchTransactions(
        currentPage,
        items_per_page,
        query.filterKey,
        query.filterValue
      );
      setFilteredData(data.transactions);
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    filteredData,
    totalPages,
    loading,
    handleSearch,
    setFilteredData,
  };
};
