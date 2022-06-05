import { useEffect, useState } from 'react';
import { downloadUrlSound } from './../firebase/sounds';

export default function useSound(id) {
  const [soundUrl, setSoundUrl] = useState(null);
  const [stopper, setStopper] = useState(null);

  useEffect(() => {
    if (id) {
      downloadUrlSound(id)
        .then(setSoundUrl)
        .catch((err) => {
          console.error(err);
          setSoundUrl(null);
        });
    }
  }, [id]);

  const doSound = () => {
    if (soundUrl && !stopper) {
      setStopper(true);
      const audio = new Audio(soundUrl);
      audio.load();
      audio.volume = 0.5;
      const audioPromise = audio.play();
      if (audioPromise !== undefined) {
        audioPromise.then(() => setStopper(false)).catch((err) => console.error(err));
      }
    }
  };

  return { doSound };
}
