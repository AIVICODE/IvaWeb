import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [isReCaptchaLoaded, setReCaptchaLoaded] = useState(false);

  const siteKey = "6Lfb7KoqAAAAAJMw24GqyS1uIENKvGfcgVWR8_ze"; // Tu clave de sitio reCAPTCHA

  // Cargar el script de reCAPTCHA
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`; // Usando el script estándar
    script.async = true;
    script.onload = () => {
      if (window.grecaptcha) {
        setReCaptchaLoaded(true);
      } else {
        console.error("reCAPTCHA no se cargó correctamente.");
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Limpiar el script cuando el componente se desmonte
    };
  }, [siteKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado, ejecutando reCAPTCHA...");

    if (!isReCaptchaLoaded) {
      console.error("reCAPTCHA no se ha cargado todavía.");
      setMessage("reCAPTCHA no se ha cargado.");
      setMessageType("error");
      return;
    }

    try {
      // Espera a que el reCAPTCHA se ejecute correctamente
      const token = await window.grecaptcha.execute(siteKey, { action: "submit" });
      console.log("Token de reCAPTCHA:", token);

      const action = "submit";  // Define la acción que coincida con la acción en el frontend

      const response = await fetch("/api/verifyRecaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptcha_token: token,
          recaptcha_action: action,  // Asegúrate de incluir la acción
        }),
      });

      const data = await response.json();
      console.log("Respuesta de la verificación:", data);

      if (data.success) {
        sendEmail(); // Llama a la función para enviar el correo si reCAPTCHA es válido
      } else {
        setMessage("Error de validación de reCAPTCHA.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error ejecutando reCAPTCHA:", error);
      setMessage("Hubo un problema al ejecutar reCAPTCHA.");
      setMessageType("error");
    }
  };

  const sendEmail = async () => {
    try {
      // Configuración para enviar el correo
      const result = await emailjs.sendForm(
        "service_ypket7q", 
                "template_88xq8vd", 
                form.current,
                "8RukIO1UTSGoiXKkj"
      );
      console.log(result.text);
      setMessage("Correo enviado correctamente.");
      setMessageType("success");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setMessage("Hubo un problema al enviar el correo.");
      setMessageType("error");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna del Formulario */}
        <div>
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700"
              >
                Tu nombre
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="Tu nombre"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>
  
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700"
              >
                Tu correo electrónico
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="Tu email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>
  
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Mensaje
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Tu mensaje"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Enviar
            </button>
          </form>
  
          {message && (
            <div
              className={`mt-6 text-center text-lg font-semibold p-4 rounded-md ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
  
        {/* Columna de Información de Contacto */}
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Información de contacto
          </h3>
          <p className="text-lg text-gray-600">
            ¿Tienes preguntas o necesitas más información? ¡Escríbenos! Nos
            encantaría ayudarte.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-gray-700">ivawebcontact@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-gray-700">+598 91777442</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-gray-700">Maldonado, Uruguay</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Botón de WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=+59891777442&text=Hola,%20quiero%20más%20información%20sobre%20sus%20servicios."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300 flex items-center justify-center"
        aria-label="Contáctanos por WhatsApp"
      >
        <img
          src="images/whatsapp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>
    </div>
  );
}
