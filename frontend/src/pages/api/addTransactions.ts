import { applicationConfig } from "@/configuration/ApplicationConfig";

type transactionData = {
  file: ArrayBuffer | string;
  fileName: string;
};

export async function addTransactions(data: transactionData) {
  const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/upload/transactions`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default async function handler(req: any, res: any) {
  const response = await addTransactions(req.body);
  res.status(200).json(response);
}
