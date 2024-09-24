import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TransactionsTable from "../components/TransactionsTable";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { Transaction } from "../interfaces/transaction";
import { addNewTransaction } from "@/utils/transactions";

const Home = () => {
  const defaultValues = {
    id: "",
    nome: "",
    cpfCnpj: 0,
    data: "00-00-00",
    valor: 0,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("nome");
  const [newTransaction, setNewTransaction] = useState(defaultValues);

  const { transactions, totalPages } = useGetTransactions(currentPage);

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

  /*const handleAddTransaction = async () => {
    if (
      newTransaction.id &&
      newTransaction.nome &&
      newTransaction.data &&
      newTransaction.cpfCnpj &&
      newTransaction.valor
    ) {
      try {
        await addNewTransaction(newTransaction);
        setNewTransaction(defaultValues);
      } catch (error) {
        console.error("Error adding transaction: ", error);
      }
    }
  };*/

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
