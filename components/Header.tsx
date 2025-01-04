'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="bg-transparent text-white absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 flex sm:items-center sm:justify-between">
        {/* Logo alineado más a la izquierda */}
        <Link href="/" className="mb-4 sm:mb-0 flex items-center mr-6">
          <motion.img 
            src="/images/logo.svg" 
            alt="Logo" 
            className="h-20 w-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* Menú de navegación */}
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-2 sm:space-x-4">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="relative group block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-yellow-300 text-lg sm:text-xl font-semibold px-4 py-2 block">
                    {item.label}
                  </span>
                  {hoveredIndex === index && (
                    <motion.span 
                      className="absolute inset-0 bg-white bg-opacity-20 rounded-md -z-10"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
