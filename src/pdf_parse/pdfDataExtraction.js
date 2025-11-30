

const pdfDataExtraction = async(text) => {

console.log(text);

const documentoMatch = text.match(/C[eé]dula de Ciudadan[ií]a:\s+([\d\.\,]+)/i);
const fechaMatch = text.match(/Fecha de Expedici[oó]n:\s+(.+)/i);
const lugarMatch = text.match(/Lugar de Expedici[oó]n:\s+(.+)/i);
const nombreMatch = text.match(/A nombre de:\s+(.+)/i);
const estadoMatch = text.match(/Estado:\s+(.+)/i);

const info = {
  numeroDocumento: documentoMatch ? documentoMatch[1].trim() : null,
  fechaExpedicion: fechaMatch ? fechaMatch[1].trim() : null,
  lugarExpedicion: lugarMatch ? lugarMatch[1].trim() : null,
  nombre: nombreMatch ? nombreMatch[1].trim() : null,
  estado: estadoMatch ? 'VIGENTE' : null
};


  return info;
}

export default pdfDataExtraction
