import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAilhViLyouj2lhtDxsynpvX9Pt97sgDLA',
  authDomain: 'lister-2b66d.firebaseapp.com',
  projectId: 'lister-2b66d',
  storageBucket: 'lister-2b66d.appspot.com',
  messagingSenderId: '632291512927',
  appId: '1:632291512927:web:7af703f15fa686164f81ea',
  measurementId: 'G-2DM7HQYMNL',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
 

export {auth};

 

 