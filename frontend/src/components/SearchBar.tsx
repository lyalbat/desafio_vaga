import React from 'react';

interface SearchBarProps {
  searchField: string;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddTransaction: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchField,
  searchQuery,
  handleSearchChange,
  handleFieldChange,
  handleAddTransaction,
}) => (
  <div className="mb-4 flex space-x-2">
    <select
      value={searchField}
      onChange={handleFieldChange}
      className="border rounded-lg py-2 px-2 text-gray-500"
    >
      <option value="nome">Nome</option>
      <option value="cpfCnpj">Documento de identificação</option>
      <option value="valor">Valor</option>
      <option value="id">ID</option>
      <option value="data">Data</option>
    </select>
    <input
      type="text"
      placeholder={`Filtre por ${searchField}`}
      value={searchQuery}
      onChange={handleSearchChange}
      className="border rounded-lg p-2 w-full text-gray-600"
    />
    <button
      onClick={handleAddTransaction}
      className="border bg-blue-600 text-white rounded-lg px-4 py-2"
    >
      Adicionar Transação
    </button>
  </div>
);

export default SearchBar;
