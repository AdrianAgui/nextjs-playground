import Head from 'next/head';
import Header from './Header';

export default function PageLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header></Header>

      <main>{children}</main>
    </>
  );
}
