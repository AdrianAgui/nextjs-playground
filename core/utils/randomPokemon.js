import { TOTAL_POKEMON } from 'core/utils/constants';

export default function randomPokemon() {
  return Math.floor(Math.random() * TOTAL_POKEMON);
}
