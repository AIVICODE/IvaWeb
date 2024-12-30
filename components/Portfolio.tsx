import React, { useState } from 'react';
import Image from 'next/image';

const projects = [
  { id: 1, title: 'El Empuje', image: '/images/elempujemain.png' },
  { id: 2, title: 'Aurora Café (in progress)', image: '/images/aurora.png' }, // Cambié el iframe por una imagen
];

export default function Portfolio() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  return (
    <section id="portafolio" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Proyectos Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleContentClick(project.image)} // Solo se pasa la imagen
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-auto transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-xl font-semibold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={selectedContent}
              alt="Imagen seleccionada"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
