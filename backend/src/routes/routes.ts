import express from "express";
import multer from "multer";
import { TransactionModel } from "../models/transaction";

const router = express.Router();
//configuracao para salvar dado em memoria e otimizar o processamento por buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/healthcheck", (req, res) => {
  res.send("Healthcheck - API is UP!");
});

//Mock do banco
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
];

router.get("/transactions", async (req, res) => {
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
  console.log("this was sent in the request body: ", req.body);

  if (!model) {
    return res.status(400).json({ message: "Model is required" });
  }
  try {
    const newTransaction = new TransactionModel(model);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name == "ValidationError")
        return res
          .status(422)
          .json({
            message: "Unprocessable entity ",
            stackTrace: error.message,
          });
      if (new RegExp("duplicate key error").test(error.message)) {
        return res
          .status(400)
          .json({
            message: "Bad request"
          });
      }
    }

    return res.status(500).json({ message: "Server error", error });
  }
});

export default router;
