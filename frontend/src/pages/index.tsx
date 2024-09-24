import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TransactionsTable from "../components/TransactionsTable";
import { useTransactions } from "../hooks/useTransactions";
import { Transaction } from "../interfaces/transaction";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("nome");
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    nome: "",
    valor: 0,
  });

  const { transactions, totalPages } = useTransactions(currentPage);

  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      const fieldValue = transaction[searchField as keyof Transaction]
        .toString()
        .toLowerCase();
      return fieldValue.includes(searchQuery.toLowerCase());
    }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchField(e.target.value);
  };

  const handleAddTransaction = async () => {
    if (newTransaction.id && newTransaction.nome && newTransaction.valor) {
      /*
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      */

      setNewTransaction({ id: "", nome: "", valor: 0 });
      // fetchTransactions(currentPage);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <SearchBar
        searchField={searchField}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleFieldChange={handleFieldChange}
        handleAddTransaction={handleAddTransaction}
      />
      <TransactionsTable
        transactions={filteredTransactions}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
