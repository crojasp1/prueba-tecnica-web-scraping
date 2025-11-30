import fs from "fs";
import path from "path";
export const certificationDownload = async (page, index) => {
  console.log(` Iniciando descarga para consulta #${index}`);

  try {
    const [download] = await Promise.all([
      page.waitForEvent("download").catch(err => {
        console.log(` No se disparó el evento download en #${index}`);
        throw err;
      }),
      page.locator("input[value='Generar Certificado']").click({ force: true })
    ]);

    console.log(`✔️ Download detectado en #${index}`);

    const pdfDir = path.join("data", "pdfs");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

    const pdfName = download.suggestedFilename();
    const uniqueName = `${index}_${pdfName}`;
    const filePath = path.join(pdfDir, uniqueName);

    await download.saveAs(filePath);
    console.log(` PDF guardado en #${index}: ${filePath}`);

    return filePath;

  } catch (err) {
    console.log(` Error en certificationDownload (#${index}):`, err);
    return "";  
  }
};
