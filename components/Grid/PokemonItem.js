import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';
import PokemonSkeleton from './PokemonSkeleton';

export default function PokemonItem({ pokemon }) {
  if (pokemon) {
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
            <Text fontSize='xl'>{name}</Text>
          </div>
        </a>
      </Link>
    );
  } else {
    return <PokemonSkeleton />;
  }
}
