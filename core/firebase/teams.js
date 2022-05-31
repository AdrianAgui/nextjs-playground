import { db } from './init';
import { collection, getDocs, query, where, doc, addDoc, deleteDoc } from '@firebase/firestore';

export const getTeam = async (uid) => {
  const teamsCollection = collection(db, 'teams');
  const q = query(teamsCollection, where('userId', '==', uid));
  const data = await getDocs(q);
  const team = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return team;
};

export const addTeamMate = async (uid, name, pokemon) => {
  let { front_default } = pokemon.sprites.other.dream_world;
  if (!front_default) {
    ({ front_default } = pokemon.sprites.other['official-artwork']);
  }

  const teamsCollection = collection(db, 'teams');
  const poke = {
    id: pokemon.id,
    name: pokemon.name,
    imageURL: pokemon.sprites.front_default,
    imageURL_art: front_default,
    userId: uid,
    trainer: name,
    level: 1,
    catchDate: +new Date(),
    type: pokemon.types.map((type) => type.type.name),
    weight: pokemon.weight / 10,
    height: pokemon.height / 10
  };
  await addDoc(teamsCollection, poke);
  return;
};

export const removeTeamMate = async (id) => {
  const teamsCollection = collection(db, 'teams');
  const q = query(teamsCollection, where('id', '==', id));
  const data = await getDocs(q);
  await deleteDoc(doc(db, 'teams', data.docs[0].id));
  return;
};
