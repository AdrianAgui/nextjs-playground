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
  const poke = mapperPokemon(uid, name, pokemon, front_default);

  await addDoc(teamsCollection, poke);
  return;
};

export const removeTeamMate = async (id) => {
  const poke = await getPokemonById(id);
  await deleteDoc(poke);
  return;
};

export const updateName = async (id, newName) => {
  const poke = await getPokemonById(id);
  await updateDoc(poke, { name: newName });
  return;
};

export const updateLevelAndExp = async (id, currentLevel, currentExp) => {
  if (currentExp >= 100) currentExp = 0;
  const poke = await getPokemonById(id);
  await updateDoc(poke, { level: currentLevel, exp: currentExp });
  return;
};

const getPokemonById = async (id) => {
  const teamsCollection = collection(db, TEAM_COLLECTION);
  const q = query(teamsCollection, where('id', '==', id));
  const data = await getDocs(q);
  if (data.docs.length === 0) return;
  const poke = doc(db, TEAM_COLLECTION, data.docs[0].id);
  return poke;
};

const mapperPokemon = (uid, name, pokemon, picture) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageURL: pokemon.sprites.front_default,
    imageURL_art: picture,
    userId: uid,
    trainer: name,
    level: 1,
    exp: 0,
    catchDate: +new Date(),
    type: pokemon.types.map((type) => type.type.name),
    weight: pokemon.weight / 10,
    height: pokemon.height / 10
  };
};
