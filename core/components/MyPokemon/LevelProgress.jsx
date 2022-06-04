import { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';
import { useI18n } from 'core/context/i18nContext';
import useLevelUp from 'core/hooks/useLevelUp';

export default function LevelProgress({ id, currentLevel, initialExp, train }) {
  const { translator } = useI18n();

  const [animating, setAnimating] = useState(false);

  const { level, exp } = useLevelUp(id, currentLevel, initialExp, train);

  useEffect(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  }, [level]);

  return (
    <section className='px-6'>
      <p className='flex justify-end items-center text-gray-600 mb-3'>
        <span className='font-semibold text-xl'>
          {translator('level')}:{' '}
          <span className={`${animating ? 'animate__animated animate__jackInTheBox' : ''} text-2xl font-bold text-black`}>{level}</span>
        </span>
      </p>

      <Progress className='rounded' colorScheme='purple' size='md' value={exp} min='0' max='100' />
    </section>
  );
}
