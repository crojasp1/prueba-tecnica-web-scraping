/**
 * @jest-environment node
 */
import pdfDataExtraction from "../src/pdf_parse/pdfDataExtraction.js";


describe('pdf data extraction test', () => {
  test('should extract document number correctly', async() => {
    const text = "Cédula de Ciudadanía: 1.140.819.985";
    const result = await pdfDataExtraction(text);

    expect(result.numeroDocumento).toBe("1.140.819.985");
  });
    
  test('Should extract expedition day correctly', async() => {
    const text = "Fecha de Expedición: 26 DE MARZO DE 2007";
    const result = await pdfDataExtraction(text);

    expect(result.fechaExpedicion).toBe("26 DE MARZO DE 2007");
  });

  test('should extract expedition place correctly', async() => {
    const text = "Lugar de Expedición: BARRANQUILLA - ATLANTICO";
    const result = await pdfDataExtraction(text);

    expect(result.lugarExpedicion).toBe("BARRANQUILLA - ATLANTICO")
  });

  test('should extract document owner name correctly', async() => {
    const text = "A nombre de: DORA JOSEFINA LOPEZ GOMEZ";
    const result = await pdfDataExtraction(text);

    expect(result.nombre).toBe("DORA JOSEFINA LOPEZ GOMEZ");
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
  

