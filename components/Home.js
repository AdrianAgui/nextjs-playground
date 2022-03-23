import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Card, Row, Text } from '@nextui-org/react';

export default function Home({ pokemons }) {
  return (
    <>
      <Container>
        <Card color='primary'>
          <Row justify='center' align='center'>
            <Text h6 size={15} color='white'>
              Pokedex Gen is an app created by <b>Adrián Aguirre</b> with <b>NextJS</b> and <b>NextUI</b> whichs gives you the best developer
              experience with all the features you need for building beautiful and modern websites and applications.
            </Text>
          </Row>
        </Card>
      </Container>

      <div className={styles.container}>
        {pokemons.length === 0 && <p>No hay pokemons</p>}
        {pokemons.length > 0 &&
          pokemons.map((pokemon) => {
            const {
              id,
              name,
              sprites: { front_default }
            } = pokemon;
            return (
              <Link href={`/pokemon/${id}`} key={id}>
                <a>
                  <div className='flex justify-center items-center'>
                    <Image src={front_default} alt={`Image for ${name}`} width={96} height={96} layout='fixed'></Image>
                    <Text size={24}>{name}</Text>
                  </div>
                </a>
              </Link>
            );
          })}
      </div>
    </>
  );
}
