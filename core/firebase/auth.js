import { signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './init';
import { LOGIN_TYPE } from 'core/utils/constants';

export const onAuthStateChanges = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      const normalizedUser = user ? mapUserFromFirebaseAuth(user) : user;
      resolve(normalizedUser);
    });
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
  const { uid, displayName, email, photoURL } = user;
  return {
    uid,
    name: displayName,
    email: email,
    avatar: photoURL
  };
};
