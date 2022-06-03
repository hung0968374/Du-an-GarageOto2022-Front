import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-gPxOZqgsKwFf8Xb1bsbS83q2DvQWYKE',
  authDomain: 'garage-a6-dev.firebaseapp.com',
  projectId: 'garage-a6-dev',
  storageBucket: 'garage-a6-dev.appspot.com',
  messagingSenderId: '804820270375',
  appId: '1:804820270375:web:3c39ec96a60c61ecc1bd02',
  measurementId: 'G-W0NVR0FN4D',
};
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
