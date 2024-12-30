import React from 'react'; // Importar React explícitamente
import '../styles/global.css'; // Importa el archivo de estilos globales
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
