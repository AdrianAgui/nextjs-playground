import Head from 'next/head';
import Header from 'components/Header';

export default function PageLayout({ children, title = 'Pokedex', description = 'Pokedex', keywords = 'pokedex, pokemon, nintendo' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header></Header>

      <main>{children}</main>
    </>
  );
}
