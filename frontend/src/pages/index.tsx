import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TransactionsTable from "../components/TransactionsTable";
import { useGetAllTransactions } from "../hooks/useGetTransactions";
import UploadButton from "@/components/UploadButton";
import { addTransactionsFile } from "@/utils/transactions";
import { useSearchTransactions } from "../hooks/useSearchTransactions";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { applicationConfig } from "@/configuration/ApplicationConfig";

const Home = () => {

  const ITEMS_PER_PAGE = applicationConfig.NEXT_ITEMS_PER_PAGE;
  const [file, setFile] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    transactions: initalData,
    loading,
    totalPages: initialTotal,
  } = useGetAllTransactions(currentPage);
  const {
    filteredData,
    loading: loadingSearch,
    handleSearch,
    totalPages: totalSearch,
    setFilteredData,
  } = useSearchTransactions(initalData, initialTotal, ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState({
    filterKey: "nome",
    filterValue: "",
  });

  useEffect(() => {
    setFilteredData(initalData);
  }, [initalData, setFilteredData]);

  if (loading || loadingSearch) return <LoadingSkeleton />;
  //VOLTAR AQUI
  // if (errorData) return <p>Error: {errorData}</p>;
  //if (errorSearch) return <p>Error: {errorSearch}</p>;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({
      filterKey: searchQuery.filterKey,
      filterValue: e.target.value,
    });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchQuery({
      filterKey: e.target.value,
      filterValue: searchQuery.filterValue,
    });
  };
  const handleKeyPressed = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") return;
    await handleSearch(searchQuery, currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    console.time("starting to read file");
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      if (!reader.result) return;
      const data = {
        file: reader.result as ArrayBuffer,
        fileName: file.name,
      };
      console.time("finished reading file");
      try {
        console.time("started insertion process");
        const response = await addTransactionsFile(data);
        console.time("finished insertion process");
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
  const totalPages = totalSearch ? totalSearch : initialTotal;
  return (
    <div className="container mx-auto p-6">
      <div className="flex w-full w-container border border-gray-300 rounded overflow-hidden p-2">
        <SearchBar
          searchQuery={searchQuery}
          handleKeyPressed={handleKeyPressed}
          handleSearchChange={handleSearchChange}
          handleFieldChange={handleFieldChange}
        />
        <UploadButton
          handleChange={handleAddTransactionChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <TransactionsTable
        transactions={filteredData}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
