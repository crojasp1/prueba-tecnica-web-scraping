import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonStoring = (info, index) => {

  console.log("INFO RECIBIDO:", info);
  const filePath = path.join(__dirname, `${index}_info.json`);
  fs.writeFileSync(filePath, JSON.stringify(info, null, 2))

  console.log("documento guardado en: ", filePath);
  
}

export default jsonStoring;
