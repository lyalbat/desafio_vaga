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
    <input type="file" onChange={handleChange} />
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-blue-300 text-white rounded-lg px-4"
    >
      Adicione suas transações
    </button>
  </div>
);

export default UploadButton;
