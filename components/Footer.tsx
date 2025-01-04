import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 relative overflow-hidden">
      {/* Fondo con gradiente y líneas diagonales */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-blue-700 to-purple-800 opacity-80"></div>
      <svg className="absolute bottom-0 left-0 w-full max-w-none" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#1e3a8a"
          d="M0,64L1440,0V150H0Z"
        />
      </svg>


<div className="absolute top-1/4 right-0 transform translate-y-[-40%] opacity-30 z-0 animate-slide-right w-full">
  <img src="/images/globostriangulos.svg" alt="Globo Triángulos" className="w-[40vw] h-auto max-w-none" />
</div>



      {/* Contenido Principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primer columna: Logo y Descripción */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              {/* Logo */} 
              <img src="/images/logo.svg" alt="Logo" className="h-16 w-auto" />
            </Link>
            <p className="mb-4">
              Transformamos tus ideas en realidad digital. Diseño web profesional y moderno para impulsar tu presencia online.
            </p>
          </div>

          {/* Segunda columna: Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-300">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-yellow-300">Servicios</Link></li>
              <li><Link href="#portafolio" className="hover:text-yellow-300">Portafolio</Link></li>
              <li><Link href="#contacto" className="hover:text-yellow-300">Contacto</Link></li>
            </ul>
          </div>

          {/* Tercera columna: Redes Sociales */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61555984555777"
                className="hover:text-yellow-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="mt-8 pt-8  text-center">
          <p>&copy; 2025 IvaWeb. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
