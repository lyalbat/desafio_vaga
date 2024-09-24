import { applicationConfig } from "@/configuration/ApplicationConfig";

 async function fetchAllTransactions(page: number, limit: number) {
  
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/transactions?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data;
}

export default async function handler(req:any, res:any){
  const { page = 1, limit = 1 } = req.query;
  const response = await fetchAllTransactions(page,limit);
  res.status(200).json(response);
}

/*
  export const transactions = [
    {
      id: "76ee118b-60cc-4f69-9689-0c42cdc00d30",
      nome: "Fernando Abshire DDS",
      cpfCnpj: 37381486121,
      data: "2024-06-13",
      valor: 852211,
    },
    {
      id: "dad0ae86-af79-4e39-bd43-d65c8a7c47e5",
      nome: "Marshall Yost",
      cpfCnpj: 17037928313,
      data: "2024-05-27",
      valor: 174378,
    },
    {
      id: "def06f7a-67d9-4e63-9a50-c1a6f925cd88",
      nome: "Shawna Pollich",
      cpfCnpj: 15250670288,
      data: "2024-01-27",
      valor: 392563,
    },
    {
      id: "a5a53ccb-a5ba-4118-8a95-a538bdbd6d48",
      nome: "Roberto Gerlach-Ziemann",
      cpfCnpj: 33514255628,
      data: "2024-07-29",
      valor: 788778,
    },
    {
      id: "5ef48f0a-62c4-41ad-814e-2610c3d67e98",
      nome: "Ben Goldner",
      cpfCnpj: 15717641354,
      data: "2024-04-11",
      valor: 272580,
    },
  ];*/
