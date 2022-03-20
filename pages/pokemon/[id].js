import PageLayout from 'components/PageLayout';
import Image from 'next/image';
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { NUM_POKEMON } from 'utils/constants';
import capitalize from 'utils/capitalize';

const endpoint = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export default function Pokemon({ idNum, name, front_default, prevId, nextId, hasPrev, hasNext }) {
  return (
    <PageLayout title={idNum + ' ' + name}>
      <div className="m-3 sm:m-0">
        <section className="max-w-md m-auto">
          <Text h1 size={40} weight="bold" className="text-center">
            {name}
          </Text>

          <div className="flex justify-center my-8 mx-3 sm:mx-10">
            <Image src={front_default} alt={`Image for ${name}`} width={360} height={260} layout="fixed"></Image>
          </div>

          <div className="flex justify-between font-bold">
            <span className="flex justify-start">
              {hasPrev && (
                <Link href={`/pokemon/${prevId}`}>
                  <a>⏮️ Previous</a>
                </Link>
              )}
            </span>

            <span className="flex justify-end ">
              {hasNext && (
                <Link href={`/pokemon/${nextId}`}>
                  <a>Next ⏭️</a>
                </Link>
              )}
            </span>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const paramIds = Array.from({ length: NUM_POKEMON }, (_, i) => {
    return { params: { id: String(i + 1) } };
  });

  return {
    paths: paramIds,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(endpoint(id));
  const pokemonObj = await response.json();
  const pokemon = { ...pokemonObj, name: capitalize(pokemonObj.name) };

  const { name } = pokemon;
  const { front_default } = pokemon.sprites.other.dream_world;
  const { idNum, prevId, nextId, hasPrev, hasNext } = pagination(id);

  return { props: { idNum, name, front_default, prevId, nextId, hasPrev, hasNext } };
}

function pagination(id) {
  return {
    idNum: +id,
    prevId: +id - 1,
    nextId: +id + 1,
    hasPrev: +id - 1 > 0,
    hasNext: +id + 1 <= NUM_POKEMON
  };
}
