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

router.post("/upload/transactions", async (req, res) => {
  const { fileName } = req.body;
  if (!fileName) {
    return res.status(400).json({ error: "File path is required." });
  }

  const absolutePath = path.join("/app/public/files", fileName);

  try {
    const result = await bulkInsertTransactions(absolutePath);
    if (!result) {
      return res.status(500).json({ error: "Could not process transactions." });
    }
    return res.status(200).json({
      success: true,
      message: result.message,
      count: result.count,
    });
  } catch (error) {
    console.error("Error during bulk insert:", error);
    return res.status(500).json({ error: "Failed to process transactions." });
  }
});

export default router;
