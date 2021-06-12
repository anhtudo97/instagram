import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC14YPdbMjR9_KdXj_BPlw6W-wM_Y4H98U',
  authDomain: 'instagram-4d643.firebaseapp.com',
  projectId: 'instagram-4d643',
  storageBucket: 'instagram-4d643.appspot.com',
  messagingSenderId: '561381664775',
  appId: '1:561381664775:web:d4a750d3f644de2d4ae2a2'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
