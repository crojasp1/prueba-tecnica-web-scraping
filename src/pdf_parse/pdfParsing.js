import fs from"fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); 

export const pdfParsing = async(path) => {

  //Leemos el pdf
  const dataBuffer = fs.readFileSync(path);
  const pdfData = await pdfParse(dataBuffer);

  return pdfData.text;
};