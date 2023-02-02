import { initializeApp } from 'firebase/app';
/**
 * @link https://stackoverflow.com/a/69048162/5378393
 */
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBxUrjIdkn6HoARdK3ODMFzhVRQiPoIzRA',
  authDomain: 'tacticool-in.firebaseapp.com',
  projectId: 'tacticool-in',
  storageBucket: 'tacticool-in.appspot.com',
  messagingSenderId: '636631679778',
  appId: '1:636631679778:web:bd944178288013cbf05b7b',
};

export const app = initializeApp(config);

export const db = getFirestore(app);

export const auth = getAuth();
