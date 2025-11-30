### Prueba Técnica – Web Scraping + Automatización

Consulta de Vigencia de Cédula – Playwright + OCR + Node.js

Este proyecto implementa un sistema completo de scraping que automatiza la consulta de vigencia de documentos, descarga y procesa PDFs, extrae información con OCR, ejecuta pruebas en paralelo y genera reportes automatizados.

Incluye:
✔ Automatización del flujo completo
✔ Extracción y procesamiento de PDFs
✔ OCR para lectura de imágenes
✔ Pruebas integradas con Playwright
✔ Pruebas unitarias con Jest
✔ Ejecución paralela (15 consultas simultáneas)
✔ Reportes de ejecución

### Tecnologías utilizadas
Tecnología	Uso
Node.js + ES Modules	Base del proyecto
Playwright Test	Pruebas de integración / E2E
Jest	Pruebas unitarias
Tesseract.js	OCR (lectura de texto desde imágenes)
Jimp	Manipulación de imágenes
pdf-parse	Lectura y extracción de texto desde PDFs
dotenv (opcional)	Variables de entorno
### Instalación
git clone <repo-url>
cd curso_playwright
npm install
npx playwright install

### Scripts disponibles
▶ 1. Ejecutar el flujo de automatización completo
npm run automation


Ejecuta la automatización que consulta la vigencia, descarga el PDF, lo procesa y guarda los datos en JSON.

▶ 2. Ejecutar consultas en paralelo (15 consultas)
npm run parallel


Requisitos:

Llenar template.env con datos válidos

Usar browser({ headless: false }) para evitar bloqueos de la página

Usar cedulas distintas para cada consulta

Esto genera:
✔ Registros de éxito/fallo
✔ Tiempos por ejecución
✔ Resultados en consola

▶ 3. Ejecutar pruebas integradas con Playwright
npm run integrated


Genera reporte HTML del flujo completo.

▶ 4. Ver el reporte de Playwright
npm run report

▶ 5. Ejecutar pruebas unitarias
npm run unitTest

### Variables de entorno

El proyecto soporta .env mediante:

import dotenv from "dotenv";
dotenv.config();


Incluye plantilla:
template.env (copiar como .env)

### Estructura técnica solicitada (entregables)

A continuación se detalla cómo el proyecto cumple cada requerimiento de la prueba técnica:

✔ 1. Automatización del formulario

Script: npm run automation

Incluye:

Acceso a la página de consulta

Diligenciamiento automático del formulario

Manejo de CAPTCHA mediante OCR (Tesseract.js)

Envío y obtención del PDF generado

✔ 2. Descarga y procesamiento del PDF

Los PDFs descargados se guardan en:

/data/pdfs


Luego se procesa con:

pdf-parse → extracción de texto

Validación y limpieza de datos

Guardado en JSON estructurado

✔ 3. Extracción y estructuración de datos

El sistema extrae:

Nombre

Número de documento

Vigencia

Fecha de expedición

Campos adicionales del PDF

Datos finales almacenados en:

/src/jsonDoc

✔ 4. Almacenamiento

Los datos extraídos se guardan en:

JSON individual por documento

JSON masivo consolidado (si aplica)

✔ 5. Consultas paralelas (15 hilos simultáneos)

Script:

npm run parallel


El sistema:

Ejecuta 15 consultas simultáneas

Evita bloqueos usando navegador no headless

Requiere que cada consulta use cédulas distintas

Registra tiempo por consulta y estado final

Resultados visibles en consola.

✔ 6. Testing
## Pruebas unitarias (Jest)
npm run unitTest


Valida funciones de:

Extracción de PDF

Limpieza de datos

OCR

## Pruebas de integración (Playwright)
npm run integrated


Genera reportes completos en la carpeta:

playwright-report/


Puedes entregar este reporte como evidencia de la suite.

# Entregables sugeridos para enviar

✔ Código fuente documentado (incluido en el repo)
✔ README (este)
✔ Resultados de pruebas paralelas (logs de consola o screenshot)
✔ Carpeta /src/jsonDoc con datos extraídos
✔ Reporte HTML de Playwright (npm run report)
✔ Suite de tests:

/integratedTest (Playwright)

/__tests__ (Jest)