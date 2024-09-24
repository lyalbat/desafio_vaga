import { applicationConfig } from "@/configuration/ApplicationConfig";
import { Transaction } from "@/interfaces/transaction";

 async function addTransaction(transaction: Transaction) {
  
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/transaction/mock`;
  const customHeaders = {
    "Content-Type": "application/json",
  };
  const response =  await fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(transaction),
  });
  if (response.status !== 201) {
    throw new Error("Failed to save transaction");
  }

  const data = await response.json();
  return data;
}

export default async function handler(req:any, res:any){
  const { transaction } = req.body;
  const response = await addTransaction(transaction);
  res.status(201).json(response);
}