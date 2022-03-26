import { AppContextProvider } from 'context/Context';
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </AppContextProvider>
  );
}

export default MyApp;
