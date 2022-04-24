import { GlobalContextProvider } from 'core/context/GlobalContext';
import { ChakraProvider } from '@chakra-ui/react';

import 'styles/globals.scss';

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
