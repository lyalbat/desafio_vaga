import { useState, useEffect } from "react";
import { Transaction } from "../interfaces/transaction";

const ITEMS_PER_PAGE = 1;

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("nome"); // Default to searching by bank
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    nome: "",
    valor: 0,
  });

  const fetchTransactions = async (page:number) => {
    try {
      const response = await fetch(`/api/transactions?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleFieldChange = (e: any) => {
    setSearchField(e.target.value);
  };
  const handleAddTransaction = async () => {
    if (newTransaction.id && newTransaction.nome && newTransaction.valor) {
      /*await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });*/

      setNewTransaction({ id: "", nome: "", valor: 0 });
      fetchTransactions(currentPage);
    }
  };

  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      const fieldValue = transaction[searchField as keyof Transaction].toString().toLowerCase();
      return fieldValue.includes(searchQuery.toLowerCase());
    }
  );

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">

      <div className="mb-4 flex space-x-2">
        <select
          value={searchField}
          onChange={handleFieldChange}
          className="border rounded-lg p-2 text-gray-600"
        >
          <option value="nome">Nome</option>
          <option value="id">ID</option>
          <option value="valor">Valor</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-lg p-2 w-full text-gray-600"
        />
        <button
          onClick={handleAddTransaction}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Add Transaction
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nome</th>
            <th className="py-3 px-6 text-left">Valor</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredTransactions.map((transaction:Transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{transaction.id}</td>
              <td className="py-3 px-6">{transaction.nome}</td>
              <td className="py-3 px-6">${transaction.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
