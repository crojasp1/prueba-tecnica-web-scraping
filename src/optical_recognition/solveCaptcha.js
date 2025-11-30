import { Jimp } from "jimp";
import Tesseract from "tesseract.js";

const usualCaptchas = ["LANAP", "K5ZGTT", "PP8E6W", "PHYCG8", "Q8T42F", "6DZ8M3"];

export const solveCaptcha = async (imagePath) => {
  let image = await Jimp.read(imagePath);

  // Validación
  if (image.bitmap.width < 10 || image.bitmap.height < 10) {
    throw new Error("La imagen del captcha está corrupta o vacía.");
  }

  // Preprocesamiento recomendado
  image
    .greyscale() // Escala grises
    .contrast(0.7) // Aumenta contraste
    .normalize() // Mejora iluminación
    .resize({ w: 400, h: Jimp.AUTO }) // Más resolución = mejor OCR
    .posterize(2) // Reduce escala de colores
    .threshold({ max: 180 }) // Limpia fondo
    .write(imagePath); // Sobrescribe temporalmente

  // Configuración avanzada de Tesseract
  const result = await Tesseract.recognize(imagePath, "eng", {
    tessedit_char_whitelist: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    tessedit_char_blacklist: "!@#$%^&*(){}[]<>?/\\|;:'\".,-=+_~`",
    tessedit_pageseg_mode: 7, // Línea única
    tessedit_ocr_engine_mode: 1, // LSTM (más confiable)
  });

  let text = result.data.text.replace(/\s/g, "").toUpperCase().trim();

  usualCaptchas.forEach((captcha) => {
    const sameFirst = text[0] === captcha[0];
    const sameSecond = text[1] === captcha[1];
    const sameFinal = text[text.length] === captcha[captcha.length];
    const sameLength = text.length === captcha.length;

    if ((sameFirst || sameSecond) && sameLength) {
      text = captcha;
    }
  });

  // if(text.split("")[0] == "L" || text.split("")[1] == "A" && text.length === 5){
  //   text= "LANAP"
  // };

  return text;
};
