const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
const { verifyCaptcha } = require('./verifyCaptcha'); // Asegúrate de que la función esté exportada

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { recaptcha_token, from_name, emailjs_email, message } = req.body; // Asegúrate de que los datos estén presentes
      console.log("Datos recibidos en la API:", { recaptcha_token, from_name, emailjs_email, message });

      // Cargar el archivo de credenciales usando la variable de entorno
      const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

      // Instanciar el cliente de reCAPTCHA
      const client = new RecaptchaEnterpriseServiceClient({
        keyFilename: credentials, // Pasa la ruta del archivo JSON de las credenciales
      });

      // Llamar a la función de verificación de reCAPTCHA usando el token recibido
      const result = await verifyCaptcha(recaptcha_token, "submit", client); // Pasa el cliente a la función de verificación

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
