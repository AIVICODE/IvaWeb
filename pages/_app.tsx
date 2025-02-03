import React from 'react'; // Importar React explícitamente
import '../styles/global.css'; // Importa el archivo de estilos globales
import Head from 'next/head'; // Importar Head desde next/head
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" /> {/* Asegúrate de que la ruta sea relativa a la carpeta "public" */}
        <meta name="author" content="Iva Web" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Diseño web, Diseño web para PYMES, Tiendas online, Desarrollo web profesional" />
        <meta name="description" content="Creamos sitios web profesionales para PYMES y emprendedores que desean destacar en el mundo digital. Contáctanos para más información." />
        <title>Iván Dos Santos | Diseño Web Profesional</title> {/* Agrega un título */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
