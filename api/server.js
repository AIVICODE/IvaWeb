
const express = require("express");
const bodyParser = require("body-parser");
const { RecaptchaEnterpriseServiceClient } = require("@google-cloud/recaptcha-enterprise");
const cors = require("cors"); // Importa CORS
const path = require('path'); // Para la ubicación del archivo de credenciales
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3000;

// Configuración del cliente reCAPTCHA Enterprise
const projectID = "ivaweb-1735514742960"; // Reemplaza con tu ID de proyecto

// Middleware
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:3001", // Permitir solicitudes desde el frontend
  methods: ["POST"], // Métodos permitidos
  allowedHeaders: ["Content-Type"], // Cabeceras permitidas
}));

// Ruta para verificar reCAPTCHA
app.post("/verifyRecaptcha", async (req, res) => {
  const { recaptcha_token, recaptcha_action } = req.body;

  // Validar los datos recibidos
  if (!recaptcha_token || !recaptcha_action) {
    return res.status(400).json({ success: false, message: "Token o acción faltante" });
  }

  try {
    // Evaluar el token con reCAPTCHA Enterprise
    const score = await createAssessment({
      recaptcha_token,
      recaptcha_action,
    });

    // Evaluar la puntuación
    if (score >= 0.5) {
      return res.json({ success: true, score });
    } else {
      return res.status(400).json({
        success: false,
        message: "Puntuación baja o acción no válida",
        score,
      });
    }
  } catch (error) {
    console.error("Error al verificar reCAPTCHA:", error.message);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});

// Función para crear una evaluación con reCAPTCHA Enterprise
async function createAssessment({ recaptcha_token, recaptcha_action }) {
  const client = new RecaptchaEnterpriseServiceClient({
    credentials: JSON.parse(process.env.PROJECTJSON_STRING) // Cargar las credenciales desde la variable de entorno
  });

  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: recaptcha_token,
        siteKey: "6Lfb7KoqAAAAAJMw24GqyS1uIENKvGfcgVWR8_ze",  // Usar tu clave del sitio
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  // Validar las propiedades del token
  if (!response.tokenProperties.valid) {
    console.error(`Token inválido: ${response.tokenProperties.invalidReason}`);
    throw new Error("Token inválido");
  }

  // Validar la acción del token
  if (response.tokenProperties.action !== recaptcha_action) {
    console.error("La acción del token no coincide");
    throw new Error("Acción del token no válida");
  }

  console.log(`Puntuación de reCAPTCHA: ${response.riskAnalysis.score}`);
  response.riskAnalysis.reasons.forEach((reason) => {
    console.log(`Razón: ${reason}`);
  });

  return response.riskAnalysis.score;
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
