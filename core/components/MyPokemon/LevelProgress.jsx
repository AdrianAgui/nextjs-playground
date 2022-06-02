import { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';
import { useI18n } from 'core/context/i18nContext';

export default function LevelProgress({ currentLevel, initialExp }) {
  const { translator } = useI18n();

  const [level, setLevel] = useState(currentLevel);
  const [exp, setExp] = useState(initialExp);

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    if (exp >= 100) {
      setLevel(level + 1);
      setExp(0);
    }
  }, [exp]);

  return (
    <section className='px-6'>
      <button onClick={() => setExp(exp + randomIntFromInterval(5, 30))}>Workout!</button>
      <p className='flex justify-end items-center text-gray-600 mb-3'>
        <span className='font-semibold text-xl'>
          {translator('level')}: <span className='text-2xl font-bold text-black'>{level}</span>
        </span>
      </p>

      <Progress className='rounded' colorScheme='purple' size='md' value={exp} min='0' max='100' />
    </section>
  );
}
