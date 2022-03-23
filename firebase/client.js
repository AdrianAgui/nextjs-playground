import { getApps, initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './config';

!getApps().length && initializeApp(firebaseConfig);

export const onAuthStateChanges = (onChange) => {
  const auth = getAuth();
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : user;
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    name: displayName,
    email: email,
    avatar: photoURL
  };
};
