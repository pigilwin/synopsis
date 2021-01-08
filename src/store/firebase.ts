import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyAFNLC086-qDN13XOMb01dI_9zu7njkrW8",
    authDomain: "pigilwin-synopsis.firebaseapp.com",
    databaseURL: "https://pigilwin-synopsis.firebaseio.com",
    projectId: "pigilwin-synopsis",
    storageBucket: "pigilwin-synopsis.appspot.com",
    messagingSenderId: "766145824123",
    appId: "1:766145824123:web:5d069ce12c6e9902"
});

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const notesCollection = firestore.collection('notes');
export const tagsCollection = firestore.collection('tags');