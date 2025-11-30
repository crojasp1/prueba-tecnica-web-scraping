import test, { expect } from "@playwright/test"
import { runCedulaCheck } from "../src/automation/runCheck";
import fs from "fs";


test('should enter to page, fill the form, solve captcha, enter to download the certificade, parse the pdf file, extract its info, and save it into a json file', async() => {
  const docs = {cedula: "1032468664", diaExped: "16", mesExped: "01", añoExped: "2013"};

  const result = await runCedulaCheck({datos: docs , index: 1});

  expect(result).toBeTruthy();

  expect(result).toStrictEqual({
    numeroDocumento: "1.032.468.664",
    fechaExpedicion: "16 DE ENERO DE 2013",
    lugarExpedicion: "BOGOTA D.C. - CUNDINAMARCA",
    nombre: "CAMILO ANDRES ROJAS PRIETO",
    estado: "VIGENTE"
});

  const pdfExist = fs.existsSync(`./data/pdfs/1_Certificado estado cedula ${result.numeroDocumento.replace(/\./g, "")}.pdf`);
  expect(pdfExist).toBeTruthy();

  const jsonExist = fs.existsSync(`./src/jsonDoc/1_info.json`);
  expect(jsonExist).toBeTruthy();
});

