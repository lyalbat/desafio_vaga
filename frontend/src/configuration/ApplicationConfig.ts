import dotenv from "dotenv";

dotenv.config();

export const applicationConfig = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  NEXT_ITEMS_PER_PAGE: Number(process.env.NEXT_ITEMS_PER_PAGE) | 10,
};
