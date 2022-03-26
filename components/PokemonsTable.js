import css from '../styles/PokemonsTable.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@nextui-org/react';

export default function Home({ pokemons }) {
  return (
    <div className={css.container}>
      {pokemons && pokemons.length === 0 && <p>No hay pokemons</p>}
      {pokemons &&
        pokemons.length > 0 &&
        pokemons.map((pokemon) => {
          const {
            id,
            name,
            sprites: { front_default }
          } = pokemon;
          return (
            <Link href={`/pokemon/${id}`} key={id}>
              <a>
                <div className='flex items-center'>
                  <Image src={front_default} alt={`Image for ${name}`} width={96} height={96} layout='fixed'></Image>
                  <Text size={24}>{name}</Text>
                </div>
              </a>
            </Link>
          );
        })}
    </div>
  );
}
