import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Blog, BlogWithoutId } from './blog/blogTypes';

firebase.initializeApp({
    apiKey: "AIzaSyCdMZsOhTiYTPiEOGj97BMDi166hWW49WQ",
    authDomain: "pigilwin.firebaseapp.com",
    databaseURL: "https://pigilwin.firebaseio.com",
    projectId: "pigilwin",
    storageBucket: "pigilwin.appspot.com",
    messagingSenderId: "40386379634",
    appId: "1:40386379634:web:872f2c486fdfaea0d267eb"
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

export const createPostFirestore = async (blogWithoutId: BlogWithoutId): Promise<Blog> => {
    const docReferrence = await collection.add(blogWithoutId);
    return blogWithIdBuilder(blogWithoutId, docReferrence.id);   
}

export const updatePostFirestore = async (blog: Blog): Promise<void> => {
    await collection.doc(blog.id).update(blogWithoutIdBuilder(blog)); 
}

export const deletePostFirestore = async (id: string): Promise<void> => {
    await collection.doc(id).delete(); 
}

export const loadPostsFirestore = async (): Promise<Blog[]> => {
    const blogs: Blog[] = [];
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

const blogWithIdBuilder = (blog: BlogWithoutId, id: string): Blog => {
    return {
        title: blog.title,
        content: blog.content,
        date: blog.date,
        id: id
    };
}

const blogWithoutIdBuilder = (blog: Blog): BlogWithoutId => {
    return {
        title: blog.title,
        content: blog.content,
        date: blog.date
    };
}