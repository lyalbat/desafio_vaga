import { Transaction } from "@/interfaces/transaction";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export const fetchAllTransactions = async (page: number, limit: number) => {
  const response = await fetch(
    `/api/getTransactions?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};

export const addNewTransaction = async (path:string) => {
  const url = `/api/addTransaction`;
  const customHeaders = {
    "Content-Type": "text/plain",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: path,
  });
  return response.status;
};

export async function cacheFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const path = `./public/files/${file.name}`
  console.log("chamou o cache file com esse path: ", path)
  try {
    await fs.writeFile(path, buffer);
    revalidatePath("/");
  } catch (error) {
    throw new Error("unable to save file")
  }
}


