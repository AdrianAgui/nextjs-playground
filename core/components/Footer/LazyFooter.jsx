import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'));

export default function LazyFooter() {
  return <Footer />;
}
