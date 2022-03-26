import { GlobalContextProvider } from 'context/GlobalContext';
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
