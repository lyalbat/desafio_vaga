import React, { useRef } from "react";
import { cacheFile } from "../utils/transactions"; 

export default function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("Files received: ", files);

    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file: ", file);

      if (file) {
        try {
          await cacheFile(file);
          console.log("File uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file: ", error);
        }
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); 
    console.log("Upload button clicked");
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-blue-500 text-white rounded-lg px-4 py-2"
      >
        Adicione suas transações
      </button>
    </div>
  );
}
