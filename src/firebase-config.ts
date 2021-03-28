import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBxUrjIdkn6HoARdK3ODMFzhVRQiPoIzRA',
  authDomain: 'tacticool-in.firebaseapp.com',
  projectId: 'tacticool-in',
  storageBucket: 'tacticool-in.appspot.com',
  messagingSenderId: '636631679778',
  appId: '1:636631679778:web:bd944178288013cbf05b7b',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

if (process.env.NODE_ENV !== 'production') {
  window.firebase = firebase;
}

export default firebase;
