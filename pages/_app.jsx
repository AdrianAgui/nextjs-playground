import { GlobalContextProvider } from 'core/context/GlobalContext';
import { I18nProvider } from './../core/context/i18nContext';

import { ChakraProvider } from '@chakra-ui/react';

import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <I18nProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </I18nProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
