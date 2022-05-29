import css from 'styles/Pokedex.module.scss';

import Image from 'next/image';
import Stat from './Stat';

export default function PokedexScreen({ pokemon, loading, error }) {
  if (error) {
    return (
      <div className={css['pokedex-screen']}>
        <Image src='/404.png' width={360} height={260} alt='Error buscando tu pokemon' className={css['pokedex-no-screen']}></Image>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Image
          src='https://media.giphy.com/media/kwuWA0j4Rvo2FHfvug/giphy.gif'
          width={360}
          height={260}
          alt='Loading...'
          className={css['pokedex-no-screen']}
        ></Image>
      ) : (
        <div className={css['pokedex-screen']}>
          <div className={css['pokemon-info']}>
            <h2 className={css['pokemon-name']}>
              <span>
                {pokemon.name} #{pokemon.id}
              </span>
              <span className='flex justify-end flex-grow cursor-pointer'>🔊</span>
            </h2>
            <picture className='animate__animated animate__jackInTheBox'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className={css['pokedex-img']}></img>
            </picture>
            <ul className={css['pokemon-stats']}>{pokemon && pokemon.stats.map((item) => <Stat key={item.stat.name} item={item} />)}</ul>
          </div>
        </div>
      )}
    </>
  );
}
