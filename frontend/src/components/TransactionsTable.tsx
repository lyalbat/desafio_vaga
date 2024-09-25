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
          <th className="py-3 px-6 text-left">Documento de Identificação</th>
          <th className="py-3 px-6 text-left">Data</th>
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
            <td className="py-3 px-6">{transaction.cpfCnpj}</td>
            <td className="py-3 px-6">{transaction.data}</td>
            <td className="py-3 px-6">${transaction.valor.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex justify-center mt-4">
    <button
      type="button"
      onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
      className="mx-1 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
      disabled={currentPage === 1}
    >
      Previous Page
    </button>

    <button
      type="button"
      onClick={() =>
        handlePageChange(
          currentPage < totalPages ? currentPage + 1 : totalPages
        )
      }
      className="mx-1 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
      disabled={currentPage === totalPages}
    >
      Next Page
    </button>
  </div>
  </>
);

export default TransactionsTable;
