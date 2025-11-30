# prueba-tecnica-web-scraping
Automatización de consulta de vigencia de cedula - Playwright + OCR + Node.js

### Descripción del proyecto
Este proyecto contiene un conjunto de pruebas automatizadas, procesamiento de imágenes, lectura de PDFs y validaciones usando tecnologías modernas como:

Playwright para pruebas end-to-end e integración

Jest para pruebas unitarias

Tesseract.js para OCR

Jimp para manipulación de imágenes

pdf-parse para lectura y extracción de texto desde PDFs

El proyecto incluye diferentes tipos de automatización, ejecución en paralelo y generación de reportes.

### Tecnologías utilizadas
Tecnología	
Node.js + ES Modules:	Base del proyecto
Playwright Test:	Pruebas integradas
Jest:	Pruebas unitarias
Tesseract.js:	Reconocimiento óptico de caracteres (OCR)
Jimp:	Manipulación de imágenes
pdf-parse:	Lectura de archivos PDF
dotenv (opcional):	Cargar variables de entorno.

### Instalación

Clona este repositorio:
git clone <repo-url>
cd curso_playwright

Instala las dependencias:
npm install

(Opcional) Instala navegadores de Playwright:
npx playwright install

### Scripts disponibles
1. Ejecutar flujos de automatización personalizados:
npm run automation

2. Ejecutar procesos en paralelo:
npm run parallel

3. Ejecutar pruebas integradas con Playwright:
npm run integrated

4. Ver reporte de Playwright:
npm run report

5. Ejecutar pruebas unitarias con Jest:
npm run unitTest

### Uso de variables de entorno
El proyecto soporta .env mediante:

import dotenv from "dotenv";
dotenv.config();


