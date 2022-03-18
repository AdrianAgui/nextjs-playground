import styles from '../styles/Home.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { Container, Card, Row, Text } from '@nextui-org/react';

import PageLayout from '../components/PageLayout';

const NUM_POKEMON = 151;
const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export default function Home({ pokemons }) {
  return (
    <PageLayout title="Pokedex">
      <Container>
        <Card color="primary">
          <Row justify="center" align="center">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              NextUI gives you the best developer experience with all the features you need for building beautiful and modern websites and
              applications.
            </Text>
          </Row>
        </Card>
      </Container>

      <div className={styles.container}>
        {pokemons.length === 0 && <p>No hay pokemons</p>}
        {pokemons.length > 0 &&
          pokemons.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <a>
                <div className="flex justify-center items-center">
                  <Image src={pokemon.sprites.front_default} alt={`Image for ${pokemon.name}`} width={96} height={96} layout="fixed"></Image>
                  <Text size={24}>{pokemon.name}</Text>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </PageLayout>
  );
}

// Hace el fetching de datos en build time o al refrescar página (menos pesado pero más estático)
// N request --> se ejecuta 1 vez

export async function getStaticProps() {
  const pokemonsFetched = await Promise.all(pokemonArray().map((id) => fetch(endpoint(id))));
  const pokemonResponse = await Promise.all(pokemonsFetched.map((p) => p.json()));
  const pokemons = pokemonResponse.map((poke) => {
    return { ...poke, name: capitalize(poke.name) };
  });

  return { props: { pokemons } };
}

// Hace el fetching de datos por petición del usuario (más pesado pero más dinámico)
// N requests --> se ejecuta N veces

// export async function getServerSideProps() {
//   const pokemonsFetched = await Promise.all(pokemonArray().map((id) => fetch(endpoint(id))));
//   const pokemons = await Promise.all(pokemonsFetched.map((p) => p.json()));
//   return { props: { pokemons } };
// }

function pokemonArray() {
  return Array.from({ length: NUM_POKEMON }, (_, i) => i + 1);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
