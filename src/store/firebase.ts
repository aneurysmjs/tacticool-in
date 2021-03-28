import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDzZbfsRVP6I1iv59REY1AgBchLe0Tt6Tk',
  authDomain: 'la-tiendapp-473ab.firebaseapp.com',
  databaseURL: 'https://la-tiendapp-473ab.firebaseio.com',
  projectId: 'la-tiendapp-473ab',
  storageBucket: 'la-tiendapp-473ab.appspot.com',
  messagingSenderId: '943540099748',
  appId: '1:943540099748:web:b9da08422d100dcdc2e431',
  measurementId: 'G-HWK910L17H',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

if (process.env.NODE_ENV !== 'production') {
  window.firebase = firebase;
}

export default firebase;
