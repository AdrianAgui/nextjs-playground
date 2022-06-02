import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './init';

const soundRef = (id) => ref(storage, `sounds/${id}.ogg`);

export const downloadUrlSound = async (id) => {
  const url = await getDownloadURL(soundRef(id));
  return url;
};
