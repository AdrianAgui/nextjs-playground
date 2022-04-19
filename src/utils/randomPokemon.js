import { TOTAL_POKEMON } from 'src/utils/constants';

export default function randomPokemon() {
  return Math.floor(Math.random() * TOTAL_POKEMON);
}
