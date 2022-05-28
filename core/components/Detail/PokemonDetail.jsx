import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getApiPokemonSpecie } from 'core/services/GetPokemons';
import Paginator from './Paginator';

import css from 'styles/PokemonDetail.module.scss';

export default function PokemonDetail({ pokemon, name, front_default }) {
  const [viewData, setViewData] = useState({});

  useEffect(() => {
    const { id } = pokemon;
    getApiPokemonSpecie(id)
      .then((data) => {
        console.log(data);
        setViewData({ jpName: data.names[0].name });
      })
      .catch((err) => console.error(err));
  }, [name]);

  return (
    <main>
      <Heading as='h1' fontSize='40px' align='center'>
        {name}&nbsp;<sup className='text-lg'>({viewData.jpName})</sup>
      </Heading>

      <div className='max-w-lg flex'>
        <section>
          <div className={css['detail-page__image'] + ' flex flex-col justify-center'}>
            {<img src={front_default} alt={`Image for ${name}`} />}
            <Paginator id={pokemon.id} />
          </div>
        </section>

        <section>aqui va texto info etc</section>
      </div>
    </main>
  );
}
