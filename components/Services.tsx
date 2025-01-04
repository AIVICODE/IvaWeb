import React, { useState, useEffect } from 'react';
import { Briefcase, Users, UserPlus, ShoppingBag, MessageCircle, Smartphone } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const services = [
  {
    icon: Briefcase,
    title: 'Diseño web corporativo',
    description: 'Soluciones profesionales para empresas que buscan destacar en el entorno digital.',
    image: '/images/corporate.png',
  },
  {
    icon: Users,
    title: 'Diseño web para PYMES',
    description: 'Servicios adaptados a las necesidades y presupuestos de pequeñas y medianas empresas.',
    image: '/images/pymes.png',
  },
  {
    icon: UserPlus,
    title: 'Diseño web para profesionales',
    description: 'Impulsa tu marca personal y establece tu presencia en línea de manera profesional.',
    image: '/images/Profesionales.png',
  },
  {
    icon: ShoppingBag,
    title: 'Diseño de tiendas online',
    description: 'Crea una plataforma de ventas efectiva para tu negocio en internet.',
    image: '/images/ecommerce.png',
  },
  {
    icon: MessageCircle,
    title: 'Creación de chatbots',
    description: 'Desarrollamos chatbots inteligentes para mejorar la atención al cliente y automatizar procesos.',
    image: '/images/chatbots.png',
  },
  {
    icon: Smartphone,
    title: 'Desarrollo de aplicaciones móviles',
    description: 'Creamos aplicaciones móviles de última generación para iOS y Android, utilizando tecnologías avanzadas.',
    image: '/images/mobileapps.png',
  },
];

const ServicesAndAboutUs = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(Array(services.length).fill(false));

  useEffect(() => {
    services.forEach((service, index) => {
      const img = new Image();
      img.src = service.image;
      img.onload = () => {
        setLoadedImages((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      };
    });
  }, []);

  return (
    <section id="servicios" className="py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-14">Nuestros Servicios</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 h-[30rem]
                  ${loadedImages[index] ? '' : 'bg-gray-300'}`}
                style={{
                  backgroundColor: loadedImages[index] ? 'transparent' : '#eee',
                }}
              >
                {loadedImages[index] && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${service.image})`,
                      willChange: 'transform',
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white transition-transform duration-500 group-hover:translate-y-[-5%]">
                  <service.icon className="h-14 w-14 mx-auto mb-4 transition-transform duration-500 group-hover:scale-125" />
                  <h3 className="text-3xl font-semibold text-center mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>
                  <a
                    href="#faq"
                    className="mt-4 block text-center text-blue-300 font-semibold hover:text-blue-100 transition-colors duration-200"
                  >
                    Más Información
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Sección sobre nosotros */}
        <div className="mt-20 relative p-10 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/aboutus.png')" }}
          />
          <div className="absolute inset-0 bg-black opacity-55" />
          <div className="relative z-10 text-white">
            <h3 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h3>
            <p className="text-lg leading-relaxed text-center">
              Nuestro enfoque está en convertir tu página web en una herramienta eficaz para alcanzar tus metas comerciales. Más allá de ofrecer un diseño atractivo, optimización técnica y compatibilidad con dispositivos, nuestro compromiso es ayudarte a generar resultados tangibles.
            </p>
            <p className="text-lg leading-relaxed text-center mt-4">
              Entendemos que elegir un aliado para desarrollar tu presencia digital es una decisión importante. Por eso, nos especializamos en lo que mejor hacemos: aportar un valor significativo. Nuestro éxito se mide por el impacto que logramos para ti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesAndAboutUs;

