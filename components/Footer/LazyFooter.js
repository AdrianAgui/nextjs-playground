import { lazy } from 'react';
import useNearScreen from 'hooks/isNearScreen';

const Footer = lazy(() => import('./Footer'));

export default function LazyFooter() {
  const { isNearScreen, fromRef } = useNearScreen();

  return <div ref={fromRef}>{isNearScreen ? <Footer /> : null}</div>;
}
