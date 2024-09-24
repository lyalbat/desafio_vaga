import dotenv from 'dotenv';

dotenv.config();

export const applicationConfig = {
    PORT: process.env.PORT || 3001,
    MONGODB_URI: process.env.MONGODB_URI as string,
    COLLECTION_NAME: process.env.COLLECTION_NAME as string
}
