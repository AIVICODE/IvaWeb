import React from 'react'; 

const faqs = [
  {
    question: '¿Por qué necesito una página web para mi negocio?',
    answer: 'Una página web aumenta tu visibilidad online, permite a los clientes encontrarte fácilmente y mejora la credibilidad de tu negocio.'
  },
  {
    question: '¿Qué beneficios obtendré al trabajar con ustedes para crear mi página web?',
    answer: 'Obtendrás una página web diseñada a medida, que destacará tu presencia en línea, atraerá más clientes y fortalecerá la confianza en tu marca. Nuestro enfoque combina tecnología moderna y diseño atractivo para ofrecerte una herramienta profesional que impulse tus objetivos comerciales.'
  },
  {
    question: '¿Cuánto tiempo lleva crear una página web?',
    answer: 'El tiempo varía según la complejidad, pero generalmente toma entre 1 y 6 semanas para un sitio web completo.'
  },
  {
    question: '¿Qué es el diseño responsivo?',
    answer: 'El diseño responsivo asegura que tu sitio web se vea bien en todos los dispositivos, desde teléfonos móviles hasta computadoras de escritorio.'
  },
  {
    question: '¿Qué es SEO y por qué es importante?',
    answer: 'SEO (Search Engine Optimization) son técnicas para mejorar la visibilidad de tu sitio web en los resultados de los motores de búsqueda, lo que atrae más visitantes y aumenta las oportunidades de negocio.'
  },
  {
    question: '¿Por qué necesito mantenimiento web?',
    answer: 'El mantenimiento web asegura que tu sitio esté actualizado, seguro y funcionando correctamente, lo que es crucial para retener visitantes y clientes.'
  },
  {
    question: '¿Qué impacto tendrá la web en mi negocio?',
    answer: 'Nuestros clientes han reportado un aumento en la visibilidad, más clientes potenciales y una mejora general en la percepción de su marca gracias a sus nuevas páginas web.'
  },
  {
    question: '¿Qué necesito para empezar una tienda online?',
    answer: 'Necesitarás un catálogo de productos, fotos de calidad, descripciones detalladas, un sistema de procesamiento de pagos y una estrategia de envío.'
  },
  {
    question: '¿Hacen apps para mobile?',
    answer: '¡Sí! Creamos aplicaciones móviles utilizando tecnologías de punta, asegurándonos de que sean rápidas, seguras y personalizadas para tus necesidades.'
  },
  {
    question: '¿Qué características debería tener el sitio web de una PYME?',
    answer: 'Debe ser fácil de navegar, tener información clara sobre productos o servicios, incluir formas de contacto, y estar optimizado para búsquedas locales.'
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
