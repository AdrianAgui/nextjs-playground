import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), {
  suspense: false
});

export default function LazyFooter() {
  return (
    <div>
      <Footer />
    </div>
  );
}
