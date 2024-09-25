import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { applicationConfig } from "@/configuration/ApplicationConfig";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function addTransactions(fileName: string) {
  console.log("got to the bff with this file path: ", fileName)
    const url = `${applicationConfig.NEXT_PUBLIC_API_URL}/upload/transactions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to send file path to save transaction");
    }
  }

const pathDist: string =  path.join(process.cwd(), "/public/files");

const readFile = (
  req: any,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  
  return new Promise((resolve, reject) => {
    const options: formidable.Options = {};
    console.log("pathDist: ", pathDist)
    if (saveLocally) {
      options.uploadDir = pathDist;
      options.filename = (name, ext, path, form) => {
        const tmp = Date.now().toString() + "_" + path.originalFilename;
        return tmp;
      };
    }
    options.maxFileSize = 1024 * 1024 * 10; // 10mb
    const form = formidable(options);
    
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: any, res: any) {
 
  try {
    await fs.readdir(pathDist);
  } catch (error) {
    console.log("readDir error: ",error)
    await fs.mkdir(pathDist, { recursive: true });
  }

  try{
    const { fields, files } = await readFile(req, true);

    const firstFile = (files as any).file[0];
    const size = firstFile.size;
    const filepath = firstFile.filepath;
    const newFilename = firstFile.newFilename;
    const originalFilename = firstFile.originalFilename;
    
    console.log(size);
    console.log(filepath);
    console.log(newFilename);
    console.log(originalFilename);

    await addTransactions(newFilename)

  res.status(200).json({ done: "yes" , filename: newFilename});
  }
  catch(error){
   console.log(error);
  res.status(500).json({ done: "no" , filename: ''});
  }
}