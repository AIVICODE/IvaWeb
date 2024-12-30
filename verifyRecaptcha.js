const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

// Función que verifica el token de reCAPTCHA
async function verifyCaptcha(token, recaptchaAction) {
  const projectID = "ivaweb-1735514742960"; // ID de tu proyecto de Google Cloud
  const recaptchaKey = "6LcuO6kqAAAAACmXmZrIGp6Hfn_63ta4Tfd8o0yD"; // Tu clave pública de reCAPTCHA

  // Crea el cliente de reCAPTCHA
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Crea la solicitud de evaluación
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  try {
    // Realiza la solicitud para crear la evaluación
    const [response] = await client.createAssessment(request);

    // Verifica si el token es válido
    if (!response.tokenProperties.valid) {
      console.log(`El token es inválido: ${response.tokenProperties.invalidReason}`);
      return { success: false, message: "Token inválido" };
    }

    // Verifica si la acción del token coincide con la acción esperada
    if (response.tokenProperties.action === recaptchaAction) {
      console.log(`Puntuación de riesgo de reCAPTCHA: ${response.riskAnalysis.score}`);
      
      // Si la puntuación es aceptable (por ejemplo, mayor o igual a 0.5)
      if (response.riskAnalysis.score >= 0.5) {
        return { success: true, score: response.riskAnalysis.score };
      } else {
        return { success: false, message: "Puntuación de riesgo demasiado baja" };
      }
    } else {
      console.log("La acción del token no coincide con la acción esperada.");
      return { success: false, message: "Acción no válida" };
    }
  } catch (error) {
    console.error("Error al verificar el token de reCAPTCHA:", error);
    return { success: false, message: "Error en la verificación del token" };
  }
}

// Exporta la función para usarla en otras partes de tu aplicación
module.exports = { verifyCaptcha };
