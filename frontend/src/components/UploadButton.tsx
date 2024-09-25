import React from "react";

interface UploadButtonProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: any) => any;
}
const UploadButton: React.FC<UploadButtonProps> = ({
  handleChange,
  handleSubmit,
}) => (
  <div className="flex items-center flex-shrink-0 ml-2 justify-end">
  <input 
    type="file" 
    onChange={handleChange} 
    className="hidden"
    id="file-upload"
  />
  <label 
    htmlFor="file-upload" 
    className="cursor-pointer bg-blue-300 text-white rounded-l-lg px-4 py-2 transition-colors duration-200 hover:bg-blue-400"
  >
    Escolha um arquivo
  </label>
  
  <button
    type="button"
    onClick={handleSubmit}
    className="bg-blue-300 text-white ml-3 rounded-r-lg px-4 py-2 transition-colors duration-200 hover:bg-blue-400"
  >
    Adicione suas transações
  </button>
</div>
);

export default UploadButton;
