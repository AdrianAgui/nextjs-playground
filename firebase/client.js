import { getApps, initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBB2nIaqpOoI-x3tQS05yayAIYkps6Ev1E',
  authDomain: 'pokedex-d05a6.firebaseapp.com',
  projectId: 'pokedex-d05a6',
  storageBucket: 'pokedex-d05a6.appspot.com',
  messagingSenderId: '311265557073',
  appId: '1:311265557073:web:5640d92f3abb01789c1670',
  measurementId: 'G-J9R5J1VYCW'
};

!getApps().length && initializeApp(firebaseConfig);

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    name: displayName,
    email: email,
    avatar: photoURL
  };
};

export const onAuthStateChanges = (onChange) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = mapUserFromFirebaseAuth(user);
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};
