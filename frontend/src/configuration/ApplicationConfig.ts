import dotenv from 'dotenv';

dotenv.config();

export const applicationConfig = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string
}
