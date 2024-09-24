import fs from "fs";
import readline from "readline";
import { TransactionModel } from "../models/transaction";
import { formatLineBuffer } from "../utils/formatLineBuffer";
let results = new Array();

export const bulkInsert = async (filePath: string) => {
  console.log("o endereco dos arquivos é esse: ", filePath);
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
    const transaction = formatLineBuffer(line);
    results.push(transaction);
  }
  try {
    console.log("chegou na inserção com: ", results);
    await TransactionModel.insertMany(results);
    return { message: "Bulk insert successful", count: results.length };
  } catch (error) {
    console.error("Bulk insert error:", error);
  } finally {
    fs.unlinkSync(filePath);
  }
};