import { GlobalContextProvider } from 'context/GlobalContext';
import { ChakraProvider } from '@chakra-ui/react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
