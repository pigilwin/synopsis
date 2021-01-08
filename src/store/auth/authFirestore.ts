import firebase from 'firebase/app';
import { auth } from "../firebase";

export const authenticateIn = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return await auth.signInWithEmailAndPassword(email, password);
};

export const authenticateOut = async (): Promise<void> => {
    await auth.signOut();
}