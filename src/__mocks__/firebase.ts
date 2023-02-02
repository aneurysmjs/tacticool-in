/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as firebaseApp from 'firebase/app';
// import * as firebaseAuth from 'firebase/auth';
// @ts-ignore
const onAuthStateChanged = jest.fn();
// @ts-ignore
const getRedirectResult = jest.fn(() => {
  return Promise.resolve({
    user: {
      displayName: 'redirectResultTestDisplayName',
      email: 'redirectTest@test.com',
      emailVerified: true,
    },
  });
});

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification');
});
// @ts-ignore
const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword');
});

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword');
});

const signInWithRedirect = jest.fn(() => {
  return Promise.resolve('result of signInWithRedirect');
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jest.spyOn(firebaseApp, 'initializeApp').mockImplementation(() => {
  return {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    auth() {
      return {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        currentUser: {
          sendEmailVerification,
        },
        signInWithRedirect,
      };
    },
  };
});

// jest.spyOn(firebaseAuth, 'auth').mockImplementation(() => {
//   return {
//     onAuthStateChanged,
//     currentUser: {
//       displayName: 'testDisplayName',
//       email: 'test@test.com',
//       emailVerified: true,
//     },
//     getRedirectResult,
//     sendPasswordResetEmail,
//   };
// });

// firebaseApp.auth.FacebookAuthProvider = jest.fn(() => {});
// firebaseApp.auth.GoogleAuthProvider = jest.fn(() => {});
