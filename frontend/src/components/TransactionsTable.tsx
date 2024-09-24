import React from 'react';
import { Transaction } from '../interfaces/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const TransactionsTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentPage,
  totalPages,
  handlePageChange,
}) => (
  <>
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">ID</th>
          <th className="py-3 px-6 text-left">Nome</th>
          <th className="py-3 px-6 text-left">Valor</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {transactions.map((transaction) => (
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
  </>
);

export default TransactionsTable;
