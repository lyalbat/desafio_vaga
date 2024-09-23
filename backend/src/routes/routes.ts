import express from "express";
const router = express.Router();
import multer from "multer";
import { TransactionModel } from "../models/transaction";
import { Transaction } from "../interfaces/transaction";

//configuracao para salvar dado em memoria e otimizar o processamento por buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/healthcheck", (req, res) => {
  res.send("Healthcheck - API is UP!");
});

//Mock do banco
const transactions = Array.from({ length: 100 }, (v, i) => ({
  id: i + 1,
  transaction: `Transaction de numero ${i + 1}`,
}));

router.get("/transactions", (req, res) => {
  const page = req.query.page ? Number(req.query.page as string) : 1;
  const limit = req.query.limit ? Number(req.query.limit as string) : 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = transactions.slice(startIndex, endIndex);

  const response = {
    page: page,
    limit: limit,
    totalPages: Math.ceil(transactions.length / limit),
    transactions: results,
  };

  res.status(200).json(response);
});

//needs logic
router.post(
  "/upload/transactions",
  upload.single("transactions"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileBuffer = req.file.buffer;
    const fileContent = fileBuffer.toString("utf-8");

    console.log("Received file content:", fileContent);

    res.status(200).send(`File received: ${req.file.fieldname}`);
  }
);

router.post("/transaction/mock", async (req, res) => {
  const model = req.body;
  console.log("this was sent in the request body: ", req.body)
  
  if (!model) {
    return res.status(400).json({ message: "Model is required" });
  }
  try{
      const transaction = model as Transaction;
      console.log(transaction);
  }catch(error:any){
    return res.status(422).json({ message: "Invalid model format" });
  }
  try {
    const newTransaction = new TransactionModel(model);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
