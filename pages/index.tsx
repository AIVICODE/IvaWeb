import React from 'react';
import Script from 'next/script';

import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { FAQSection } from '../components/FAQsection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Cargando el script de reCAPTCHA con el componente Script de Next.js */}
      <Script 
        src="https://www.google.com/recaptcha/enterprise.js?render=6LcuO6kqAAAAACmXmZrIGp6Hfn_63ta4Tfd8o0yD" 
        strategy="lazyOnload" 
      />

      <Header />
      <main>
        <HeroSection />
        <Services />
        <Portfolio />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
