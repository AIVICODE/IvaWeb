import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="bg-blue-900 text-white py-12"
      style={{ backgroundImage: "url('images/footer.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
          <Link href="/" className="flex items-center space-x-2">
          {/* SVG logo */}
          <img src="images/logo.svg" alt="Logo" className="h-16 w-auto" />

        </Link>
            <p className="mb-4">Transformamos tus ideas en realidad digital. Diseño web profesional y moderno para impulsar tu presencia online.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-300">Inicio</Link></li>
              <li><Link href="#servicios" className="hover:text-yellow-300">Servicios</Link></li>
              <li><Link href="#portafolio" className="hover:text-yellow-300">Portafolio</Link></li>
              <li><Link href="#contacto" className="hover:text-yellow-300">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
            <a
  href="https://www.facebook.com/profile.php?id=61555984555777"
  className="hover:text-yellow-300"
  target="_blank"  // Esto hará que se abra en una nueva pestaña
  rel="noopener noreferrer"  // Esto es una buena práctica por seguridad al usar target="_blank"
>
  <Facebook className="w-6 h-6" />
</a>            
              <a href="#" className="hover:text-yellow-300"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; 2024 IvaWeb. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
