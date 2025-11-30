/**
 * @jest-environment node
 */
import pdfDataExtraction from "../src/pdf_parse/pdfDataExtraction.js";

const data = JSON.parse(process.env.BASE_UNITTEST);

describe('pdf data extraction test', () => {
  test('should extract document number correctly', async() => {
    const text = `Cédula de Ciudadanía: ${data.cedula}`;
    const result = await pdfDataExtraction(text);

    expect(result.numeroDocumento).toBe(`${data.cedula}`);
  });
    
  test('Should extract expedition day correctly', async() => {
    const text = `Fecha de Expedición: ${data.FechaExpedicion}`;
    const result = await pdfDataExtraction(text);

    expect(result.fechaExpedicion).toBe(`${data.FechaExpedicion}`);
  });

  test('should extract expedition place correctly', async() => {
    const text = `Lugar de Expedición: ${data.LugarExpedicion}`;
    const result = await pdfDataExtraction(text);

    expect(result.lugarExpedicion).toBe(`${data.LugarExpedicion}`)
  });

  test('should extract document owner name correctly', async() => {
    const text = `A nombre de: ${data.nombre}`;
    const result = await pdfDataExtraction(text);

    expect(result.nombre).toBe(`${data.nombre}`);
  });

  test('should extract vigency status correctly', async() => {
    const text = "Estado: VIGENTE";
    const result = await pdfDataExtraction(text);

    expect(result.estado).toBe("VIGENTE");
  });

  test('should return null from unexisted data', async() => {
    const text = "no encontrado";
    const result = await pdfDataExtraction(text);

    expect(result.numeroDocumento).toBeNull();
  });
  
  });
  

