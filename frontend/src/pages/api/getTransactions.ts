import { applicationConfig } from "@/configuration/ApplicationConfig";

async function fetchAllTransactions(page: number, limit: number, filter?: {filterKey: string}) {
  const queryFilter = filter ? filter : null 
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/transactions?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data;
}

export default async function handler(req: any, res: any) {
  const { page = 1, limit = 1 } = req.query;
  const response = await fetchAllTransactions(page, limit);
  res.status(200).json(response);
}
