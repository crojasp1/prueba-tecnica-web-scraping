import { solveCaptcha } from "./solveCaptcha.js";

export const captchaRecognition = async (page) => {
  const captchaPath = "captcha.png";

  // Esperar a que la imagen exista y cargue
  const captchaElement = page.getByRole("img", { name: "CAPTCHA code image" });
  await captchaElement.waitFor({ state: "visible", timeout: 5000 });

  // Screenshot del captcha
  await captchaElement.screenshot({ path: captchaPath });

  // Validar que el archivo no esté vacío
  const fs = await import("fs");
  const stats = fs.statSync(captchaPath);

  if (stats.size < 1000) {
    throw new Error("El captcha se capturó vacío. Reintentar.");
  }

  // Resolver captcha
  const captchaText = await solveCaptcha(captchaPath);
  console.log("Captcha detectado:", captchaText);

  return captchaText;
};

