import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-transparent text-white absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          {/* SVG logo oculto en dispositivos móviles */}
          <img src="images/logo.svg" alt="Logo" className="h-16 w-auto hidden sm:block" />
        </Link>
        <nav className="w-full flex sm:justify-center"> {/* Centrado solo en móviles */}
          <ul className="flex space-x-6 sm:flex sm:space-x-6 sm:justify-center"> {/* Centrado solo en móviles */}
            <li><Link href="/" className="hover:text-yellow-300">Inicio</Link></li>
            <li><Link href="#servicios" className="hover:text-yellow-300">Servicios</Link></li>
            <li><Link href="#portafolio" className="hover:text-yellow-300">Portafolio</Link></li>
            <li><Link href="#contacto" className="hover:text-yellow-300">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
