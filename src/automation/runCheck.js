import { chromium, errors } from "playwright";
import { captchaRecognition } from "../optical_recognition/captcha_recognition.js";
import { pdfParsing } from "../pdf_parse/pdfParsing.js";
import pdfDataExtraction from "../pdf_parse/pdfDataExtraction.js";
import jsonStoring from "../jsonDoc/jsonStoring.js";
import { certificationDownload } from "../certificationDownload/certDownload.js";

export const runCedulaCheck = async ({ datos, index, attempt = 1 }) => {
  console.log(`Consulta #${index} con documento ${datos.cedula}`);

  const browser = await chromium.launch({
    headless: false,
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
  });
  const page = await browser.newPage();

  let filePath = "";
  let shouldRetry = false;

  await page.goto("https://certvigenciacedula.registraduria.gov.co/Datos.aspx");

  try {
    await page.locator("#ContentPlaceHolder1_TextBox1").click();
    await page.locator("#ContentPlaceHolder1_TextBox1").fill(datos.cedula);
    await page
      .locator("#ContentPlaceHolder1_DropDownList1")
      .selectOption(datos.diaExped);
    await page
      .locator("#ContentPlaceHolder1_DropDownList2")
      .selectOption(datos.mesExped);
    await page
      .locator("#ContentPlaceHolder1_DropDownList3")
      .selectOption(datos.añoExped);

    let invalidCaptcha = false;

    page.on("dialog", async (dialog) => {
      console.log("ALERTA:", dialog.message());
      invalidCaptcha = true;
      await dialog.accept(); // Acepta automáticamente
    });

    while (true) {
      invalidCaptcha = false;

      const captcha = await captchaRecognition(page);
      console.log("CAPTCHA LEÍDO:", captcha);

      await page.locator("#ContentPlaceHolder1_TextBox2").click();

      await page.locator("#ContentPlaceHolder1_TextBox2").fill(captcha);
      console.log("Captcha ingresado, enviando...");

      await page.locator("#ContentPlaceHolder1_Button1").click();

      //Esperamos que no aparezca el alert
      await page.waitForTimeout(1500);
      console.log("¿Hubo alerta?", invalidCaptcha);

      if (invalidCaptcha) {
        console.log("Captcha incorrecto, reintentando...");
      } else {
        console.log("Captcha aceptado ");
        break;
      }
    }

    //Descargamos y guardamos el certificado en data/pdfs
    filePath = await certificationDownload(page, index);
  } catch (error) {
    if (error instanceof errors.TimeoutError) {
      if (attempt < 3) {
        console.log("Timeout, reintentando la prueba");
        shouldRetry = true;
      }
    };
    console.log("Error TimeOut: ", error);
  }finally{
    await browser.close();

  };

  if(shouldRetry === true){
    return await runCedulaCheck({ datos, index, attempt: attempt + 1 });    
  }

  //console.log("FILEPATH OBTENIDO:", filePath);
  if (filePath) {
    //Parsear el pdf
    const text = await pdfParsing(filePath);

    //Extraer data del pdf
    const info = await pdfDataExtraction(text);

    //lo guardamos en un json:
    jsonStoring(info, index);

    return info;
  }
  return null;
};
