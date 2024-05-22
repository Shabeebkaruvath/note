import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
const db = app.firestore();
// Function to create a new task for the current user
const addTaskForCurrentUser = async (description) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    try {
      await db.collection(`users/${userId}/tasks`).add({
        description,
        completed: false
      });
      console.log("Task added for the current user.");
    } catch (error) {
      console.error("Error adding task for the current user:", error);
    }
  } else {
    console.error("No user is currently authenticated.");
  }
};

export { addTaskForCurrentUser };
export { db };
export { auth };