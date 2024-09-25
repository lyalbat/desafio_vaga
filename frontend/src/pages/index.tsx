import { useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import TransactionsTable from "../components/TransactionsTable";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { Transaction } from "../interfaces/transaction";
import UploadButton from "@/components/UploadButton";
import { addTransactionsFile } from "@/utils/transactions";

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
  const [file, setFile] = useState<any>(null);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    console.time("starting to read file")
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (!reader.result) return;
      const base64data = (reader.result as string).split(",")[1];
      const data = {
        file: base64data,
        fileName: file.name,
      };
      console.time("finished reading file")
      try {
        console.time("started insertion process")
        const response = await addTransactionsFile(data);
        console.time("finished insertion process")
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("Success:", responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };
  const handleAddTransactionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;
    setFile(files[0]);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex w-full w-container border border-gray-300 rounded overflow-hidden p-2">
        <SearchBar
          searchField={searchField}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleFieldChange={handleFieldChange}
        />
        <UploadButton
          handleChange={handleAddTransactionChange}
          handleSubmit={handleSubmit}
        />
      </div>
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
