import { useEffect, useState } from 'react';
import { updateLevelAndExp } from './../firebase/teams';

export default function useLevelUp(id, currentLevel, initialExp, train) {
  const [level, setLevel] = useState(currentLevel);
  const [exp, setExp] = useState(initialExp);

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    if (exp >= 100) {
      setLevel(level + 1);
      setExp(0);
    }
    updateLevelAndExp(id, level, exp);
  }, [exp]);

  useEffect(() => {
    if (train !== 0) setExp(exp + randomIntFromInterval(5, 30));
  }, [train]);

  return { level, exp, setLevel, setExp };
}
