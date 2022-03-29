import Head from 'next/head';
import HeaderBar from 'components/Header/HeaderBar';
import LazyFooter from './Footer';

export default function PageLayout({ children, title = 'Pokedex Gen', description = 'pokedex gen', keywords = 'pokedex, pokemon, nintendo' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <HeaderBar />
      <main>{children}</main>
      <LazyFooter />
    </>
  );
}
