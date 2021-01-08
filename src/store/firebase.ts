import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Note, NoteWithoutId } from './notes/notesTypes';

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
const collection = firestore.collection('blogs');

export const authenticateIn = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return await auth.signInWithEmailAndPassword(email, password);
};

export const authenticateOut = async (): Promise<void> => {
    await auth.signOut();
}

export const createNoteFirestore = async (blogWithoutId: NoteWithoutId): Promise<Note> => {
    const docReferrence = await collection.add(blogWithoutId);
    return noteWithIdBuilder(blogWithoutId, docReferrence.id);   
}

export const updateNoteFirestore = async (blog: Note): Promise<void> => {
    await collection.doc(blog.id).update(noteWithoutIdBuilder(blog)); 
}

export const deleteNoteFirestore = async (id: string): Promise<void> => {
    await collection.doc(id).delete(); 
}

export const loadNotesFirestore = async (): Promise<Note[]> => {
    const blogs: Note[] = [];
    const snapshot = await collection.get();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        blogs.push({
            id: doc.id,
            content: data.content,
            title: data.title,
            date: data.date,
        });
    });
    return blogs;
}

const noteWithIdBuilder = (blog: NoteWithoutId, id: string): Note => {
    return {
        title: blog.title,
        content: blog.content,
        date: blog.date,
        id: id
    };
}

const noteWithoutIdBuilder = (blog: Note): NoteWithoutId => {
    return {
        title: blog.title,
        content: blog.content,
        date: blog.date
    };
}