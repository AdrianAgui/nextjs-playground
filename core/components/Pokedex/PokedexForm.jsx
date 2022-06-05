import css from 'styles/Pokedex.module.scss';

import { useState } from 'react';

export default function PokemonForm({ pokemonInput, setPokemonInput, setLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== '' && input !== pokemonInput) {
      setLoading(true);
      const id = isNaN(parseInt(input)) ? input.toLowerCase() : input;
      setPokemonInput(id);
    }
    setInput('');
  };

  return (
    <form className={css['pokemon-form']} onSubmit={handleSubmit}>
      <input
        className={css['pokemon-input']}
        type='text'
        name='pokemon'
        value={input}
        placeholder='Search your pokemon'
        onChange={(e) => setInput(e.target.value)}
        autoComplete='off'
      />
      <input type='submit' className={css['pokemon-btn']} value='' />
    </form>
  );
}
