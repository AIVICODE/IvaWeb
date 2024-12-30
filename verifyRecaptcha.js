const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const { verifyCaptcha } = require('./verifyCaptcha'); // Asegúrate de que la función esté exportada

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { recaptcha_token, from_name, emailjs_email, message } = req.body; // Asegúrate de que los datos estén presentes
      console.log("Datos recibidos en la API:", { recaptcha_token, from_name, emailjs_email, message });

      // Llamar a la función de verificación de reCAPTCHA
      const result = await verifyCaptcha(recaptcha_token, "submit"); // Asegúrate de que la acción sea la correcta

      if (result.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Error en el handler:", error);
      res.status(500).json({ success: false, message: "Hubo un error en el servidor." });
    }
  } else {
    res.status(405).json({ success: false, message: "Método no permitido" });
  }
}
