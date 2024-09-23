import express from "express";
import routes from "./src/routes/routes";
import { applicationConfig } from "./src/configuration/ApplicationConfig";
import { connectDB } from "./src/configuration/db";

const { PORT } = applicationConfig;
const app = express();
connectDB();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
