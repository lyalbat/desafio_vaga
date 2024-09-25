import { applicationConfig } from "@/configuration/ApplicationConfig";

async function fetchAllTransactions(page: number, limit: number, filterKey: string | null, filterValue: string | null) {
  const queryFilter = (filterKey&&filterValue) ? `&filterKey=${filterKey}&filterValue=${filterValue}` : "" 
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/transactions?page=${page}&limit=${limit}` + queryFilter;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data;
}

export default async function handler(req: any, res: any) {
  const { page = 1, limit = 1, filterKey = null, filterValue = null} = req.query;
  const response = await fetchAllTransactions(page, limit, filterKey, filterValue);
  res.status(200).json(response);
}
