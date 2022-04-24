import { getApps, initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from './config';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth();
export const db = getFirestore(app);
