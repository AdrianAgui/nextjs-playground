import css from 'styles/Pokedex.module.scss';

import PokedexScreen from './PokedexScreen';
import PokedexForm from './PokedexForm';
import { getApiPokemon } from 'core/services/GetPokemons';
import { addTeamMate } from 'core/firebase/teams';
import { useGlobalContext } from 'core/context/GlobalContext';

import { useState, useEffect, useCallback } from 'react';
import { TOTAL_POKEMON } from 'core/utils/constants';
import randomPokemon from 'core/utils/randomPokemon';
import Link from 'next/link';
import { useToast } from '@chakra-ui/react';
import capitalize from './../../utils/capitalize';
import { useRouter } from 'next/router';
import { useI18n } from 'core/context/i18nContext';

export default function Pokedex() {
  const { user, myTeam } = useGlobalContext();
  const { locale } = useRouter();
  const { translator } = useI18n();

  const toast = useToast();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  const randomId = randomPokemon();
  const [pokemonId, setPokemonId] = useState(randomId);

  const handleRandom = useCallback(() => {
    setPokemonId(Math.floor(Math.random() * TOTAL_POKEMON));
  });

  const handleCatch = useCallback(() => {
    if (user && myTeam.length >= 0 && myTeam.length < 6) {
      addTeamMate(user.uid, user.name, pokemon);
      toast({
        title: `${capitalize(pokemon.name)} has been catched!`,
        position: 'bottom-left',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } else {
      toast({
        title: `Error adding ${capitalize(pokemon.name)}`,
        description: 'Your team only can have 6 pokemons max',
        position: 'bottom-left',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  });

  useEffect(() => {
    setLoading(true);
    getApiPokemon(pokemonId)
      .then((pokeData) => {
        setPokemon(pokeData);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, [pokemonId]);

  return (
    <div className={css['pokedex-container']}>
      <div className={css['pokedex']}>
        <div className={css['pokedex-left']}>
          <div className={css['pokedex-left-top']}>
            <div className={`${css['light']} ${css['is-sky']} ${css['is-big']}`} />
            <div className={`${css['light']} ${css['is-red']}`} />
            <div className={`${css['light']} ${css['is-yellow']}`} />
            <div className={`${css['light']} ${css['is-green']}`} />
          </div>
          <div className={css['pokedex-screen-container']}>
            <PokedexScreen pokemon={pokemon} loading={loading} error={error} />
          </div>
          <div className={css['pokedex-left-bottom']}>
            <div className='flex items-center justify-between'>
              <input type='button' className={`${css['pokemon-btn']} text-3xl font-bold`} value='?' onClick={handleRandom} />
              <div className='flex flex-col ml-3 text-lg font-bold'>
                {user && (
                  <div
                    className={`flex justify-center items-center mb-1 cursor-pointer ${css['light']} ${css['is-green']} ${css['is-large']}`}
                    onClick={handleCatch}
                  >
                    {translator('pokedex.catch')}
                  </div>
                )}
                <div className={`flex justify-center items-center cursor-pointer ${css['light']} ${css['is-orange']} ${css['is-large']}`}>
                  <Link locale={locale} href={`/pokemon/${pokemonId}`}>
                    <a className='flex items-center'>{translator('pokedex.detail')}</a>
                  </Link>
                </div>
              </div>
            </div>
            <PokedexForm pokemonId={pokemonId} setPokemonId={setPokemonId} setLoading={setLoading} />
          </div>
        </div>
        <div className={`${css['pokedex-right-front']} hidden md:block`} />
        <div className={`${css['pokedex-right-back']} hidden md:block`} />
      </div>
    </div>
  );
}
