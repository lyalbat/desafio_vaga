import { applicationConfig } from "@/configuration/ApplicationConfig";

 async function addTransaction(path: string) {
  
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/upload`;
  const customHeaders = {
    "Content-Type": "text/plain",
  };
  const response =  await fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: path,
  });
  if (response.status !== 201) {
    throw new Error("Failed to save transaction");
  }

  const data = await response.json();
  return data;
}

export default async function handler(req:any, res:any){
  const { path } = req.body;
  const response = await addTransaction(path);
  res.status(201).json(response);
}