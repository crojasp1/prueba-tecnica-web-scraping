import {runCedulaCheck} from "../src/automation/runCheck.js";
import dotenv from "dotenv";

dotenv.config();
//const RUNS = 15;  // queremos 15 consultas en paralelo

const documentArray = JSON.parse(process.env.BASE_DOCUMENTS) ;

const runParallelTests = async () => {
  const results = [];

  // Creamos 15 tareas
  const tasks = documentArray.map((doc, i) =>
    (async () => {

      const start = Date.now();  // 1) guardamos tiempo de inicio

      try {
        // 2) ejecutamos la consulta real
        const data = await runCedulaCheck({
          datos: doc,
          index: i + 1
        });

        const end = Date.now();

        // 3) guardamos resultado exitoso
        results.push({
          id: i + 1,
          tiempoMs: end - start,
          exito: true,
          datos: data,
          error: null
        });

      } catch (error) {
        const end = Date.now();

        // 4) guardamos fallo
        results.push({
          id: i + 1,
          tiempoMs: end - start,
          exito: false,
          error: error.message
        });
      }

    })() // ← IMPORTANTE: ejecutamos la función inmediatamente
  );

  // 5) ejecutamos las 15 tareas en paralelo
  await Promise.all(tasks);

  // 6) mostramos resultados
  console.table(results);
};

runParallelTests();

