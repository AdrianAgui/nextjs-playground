import { getApps, initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from './config';
import { LOGIN_TYPE } from 'src/utils/constants';

!getApps().length && initializeApp(firebaseConfig);
const auth = getAuth();

export const onAuthStateChanges = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : user;
    onChange(normalizedUser);
  });
};

export const login = (loginType) => {
  const provider = loginType === LOGIN_TYPE.GOOGLE ? new GoogleAuthProvider() : new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => {
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
