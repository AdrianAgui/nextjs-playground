import Head from 'next/head';
import Header from 'components/Header';

export default function PageLayout({ children, title = 'Pokedex Gen', description = 'pokedex gen', keywords = 'pokedex, pokemon, nintendo' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <header>
        <Header />
      </header>

      <main>{children}</main>
    </>
  );
}
