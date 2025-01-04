import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative text-white pt-24 pb-20 bg-cover bg-center h-screen">
      {/* Video de fondo para pantallas grandes */}
      <div className="absolute top-0 left-0 w-full h-full hidden sm:block">
        <video
          className="w-full h-full object-cover"
          src="/images/bannervideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>

      {/* Imagen de fondo para dispositivos móviles */}
      <div className="absolute top-0 left-0 w-full h-full sm:hidden">
        <img
          className="w-full h-full object-cover"
          src="/images/banner3.png" // Aquí va la imagen para móviles
          alt="Imagen de fondo móvil"
        />
      </div>

      {/* Contenido del banner */}
      <div className="relative z-20 flex items-end justify-center w-full h-full px-4">
        {/* Contenedor de los botones centrados en la parte inferior */}
        <div className="text-center pb-10 w-full">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Botón de Presupuesto */}
            <Link
              href="#contacto"
              className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition duration-300 text-sm sm:text-base"
            >
              Solicitar Presupuesto
            </Link>
            {/* Botón de Proyectos */}
            <Link
              href="#portafolio"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition duration-300 text-sm sm:text-base"
            >
              Ver Proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
