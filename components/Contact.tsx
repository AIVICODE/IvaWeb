import React, { useRef, useState } from "react";
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

  const siteKey = "6LcuO6kqAAAAACmXmZrIGp6Hfn_63ta4Tfd8o0yD"; // Reemplaza con tu clave de sitio reCAPTCHA

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Formulario enviado, ejecutando reCAPTCHA...");

    e.preventDefault();
    console.log("Formulario enviado2, ejecutando reCAPTCHA...");


    // Ejecutar reCAPTCHA antes de enviar
    if (typeof window.grecaptcha === "undefined") {
      console.error("reCAPTCHA no se ha cargado todavía.");
    } else {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action: "submit" })
          .then((token: string) => {
            console.log("DEBERIA MOSTRARSE EL TOKEN DEBAJO...");

            console.log("CAPTCHA token:", token);
            onSubmit(token); // Llama a la función onSubmit con el token
          })
          .catch((error: Error) => {
            console.error("Error ejecutando reCAPTCHA:", error);
          });
          
      });
    }
  };

  const onSubmit = (token: string) => {
    sendEmail(token); // Llamamos a la función de envío del formulario con el token
  };

  const sendEmail = (token: string) => {
    if (form.current) {
      // Recopilar los datos del formulario
      const formData = new FormData(form.current);
      formData.append("recaptcha_token", token); // Agregar el token de reCAPTCHA al formulario
console.log("ingresa a envio de mail");
      // Enviar la solicitud a tu API backend
      fetch("/api/verifyRecaptcha", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Si la verificación de reCAPTCHA es exitosa, enviar el email
            emailjs
              .sendForm(
                "service_ypket7q", // Reemplaza con tu Service ID
                "template_88xq8vd", // Reemplaza con tu Template ID
                form.current,
                "8RukIO1UTSGoiXKkj" // Reemplaza con tu Public Key
              )
              .then(
                (result) => {
                  console.log("Email sent:", result.text);
                  setMessage("¡Mensaje enviado exitosamente!");
                  setMessageType("success");
                  form.current?.reset();
                },
                (error) => {
                  console.error("Error sending email:", error.text);
                  setMessage("Hubo un problema al enviar el mensaje.");
                  setMessageType("error");
                }
              );
          } else {
            console.error("Error en la validación de reCAPTCHA:", data.message);
            setMessage("Error de validación de reCAPTCHA.");
            setMessageType("error");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud de verificación:", error);
          setMessage("Hubo un problema al verificar reCAPTCHA.");
          setMessageType("error");
        });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Contáctanos
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <form
            ref={form}
            onSubmit={handleSubmit}
            id="demo-form"
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
          >
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-medium text-gray-700"
              >
                Tu nombre
              </label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="emailjs_email"
                className="block text-sm font-medium text-gray-700"
              >
                Tu correo electrónico
              </label>
              <input
                type="email"
                name="emailjs_email"
                id="emailjs_email"
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
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              ></textarea>
            </div>

            <button
              className="g-recaptcha w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
              type="submit"
              data-sitekey={siteKey}
              data-action="submit"
            >
              Enviar mensaje
            </button>
          </form>

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

        <a
          href="https://api.whatsapp.com/send?phone=+59891777442&text=Hola,%20quiero%20más%20información%20sobre%20sus%20servicios."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300 flex items-center justify-center"
          aria-label="Contáctanos por WhatsApp"
        >
          <img
            src="images/whatsapp.svg" // La ruta del archivo SVG en la carpeta public
            alt="WhatsApp"
            className="w-10 h-10" // Ajusta el tamaño del icono
          />
        </a>
      </div>
    </section>
  );
}
