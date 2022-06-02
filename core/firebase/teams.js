import { db } from './init';
import { collection, query, where, getDocs, doc, addDoc, updateDoc, deleteDoc } from '@firebase/firestore';

const TEAM_COLLECTION = 'teams';

export const getTeam = async (uid) => {
  const teamsCollection = collection(db, TEAM_COLLECTION);
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

  const teamsCollection = collection(db, TEAM_COLLECTION);
  const poke = {
    id: pokemon.id,
    name: pokemon.name,
    imageURL: pokemon.sprites.front_default,
    imageURL_art: front_default,
    userId: uid,
    trainer: name,
    level: 1,
    exp: 0,
    catchDate: +new Date(),
    type: pokemon.types.map((type) => type.type.name),
    weight: pokemon.weight / 10,
    height: pokemon.height / 10
  };
  await addDoc(teamsCollection, poke);
  return;
};

export const removeTeamMate = async (id) => {
  const teamsCollection = collection(db, TEAM_COLLECTION);
  const q = query(teamsCollection, where('id', '==', id));
  const data = await getDocs(q);
  const poke = doc(db, TEAM_COLLECTION, data.docs[0].id);
  await deleteDoc(poke);
  return;
};

export const modifyName = async (id, newName) => {
  const teamsCollection = collection(db, TEAM_COLLECTION);
  const q = query(teamsCollection, where('id', '==', id));
  const data = await getDocs(q);
  const poke = doc(db, TEAM_COLLECTION, data.docs[0].id);
  await updateDoc(poke, { name: newName });
  return;
};
