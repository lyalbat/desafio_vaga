import express from "express";
import fs from "fs";
import path from "path";
import {
  bulkInsertTransactions,
  fetchTransactions,
} from "../controllers/transactions";
import { fetchUsers } from "../controllers/users";
import { formatFiltersReq } from "../utils/formatFiltersReq";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.send("Healthcheck - API is UP!");
});

router.get("/transactions", async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page as string) : 1;
    const limit = req.query.limit ? Number(req.query.limit as string) : 10;
    const filter = formatFiltersReq(req.query.filterKey, req.query.filterValue);
    const response = await fetchTransactions(page, limit, filter);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page as string) : 1;
    const limit = req.query.limit ? Number(req.query.limit as string) : 10;
    const filter = formatFiltersReq(req.query.filterKey, req.query.filterValue);
    const response = await fetchUsers(page, limit, filter);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/upload/transactions", (req, res) => {
  const { file, fileName } = req.body;

  const buffer = Buffer.from(file, "base64");
  const filePath = path.join(fileName);

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save file." });
    }
    bulkInsertTransactions(filePath);

    res.status(200).json({ message: "File uploaded successfully!" });
  });
});

export default router;
