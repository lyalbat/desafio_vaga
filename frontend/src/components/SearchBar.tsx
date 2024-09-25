import React from 'react';

interface SearchBarProps {
  searchQuery: {filterKey: string, filterValue: string};
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFieldChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleKeyPressed: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
  handleFieldChange,
  handleKeyPressed,
}) => (
  <div className="flex-grow flex items-center space-x-2 w-2/3 mx-2">
    <select
      value={searchQuery.filterKey}
      onChange={handleFieldChange}
      className="border rounded-lg py-2 px-4 text-gray-500 flex-shrink-0"
    >
      <option value="nome">Nome</option>
      <option value="cpfCnpj">Documento de identificação</option>
      <option value="valor">Valor</option>
      <option value="id">ID</option>
      <option value="data">Data</option>
    </select>
    <input
      type="text"
      placeholder={`Filtre por ${searchQuery.filterKey}`}
      value={searchQuery.filterValue}
      onChange={handleSearchChange}
      onKeyDown={handleKeyPressed}
      className="border rounded-lg p-2 w-full text-gray-600 flex-grow mx-2"
    />
  </div>
);

export default SearchBar;
