import { notesCollection } from "../firebase";
import { Note, NoteWithoutId } from "./notesTypes";

export const createNoteFirestore = async (noteWithoutId: NoteWithoutId): Promise<Note> => {
    const docReferrence = await notesCollection.add(noteWithoutId);
    return noteWithIdBuilder(noteWithoutId, docReferrence.id);   
}

export const updateNoteFirestore = async (note: Note): Promise<void> => {
    await notesCollection.doc(note.id).update(noteWithoutIdBuilder(note)); 
}

export const deleteNoteFirestore = async (id: string): Promise<void> => {
    await notesCollection.doc(id).delete(); 
}

export const loadNotesFirestore = async (): Promise<Note[]> => {
    const notes: Note[] = [];
    const snapshot = await notesCollection.get();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        notes.push({
            id: doc.id,
            text: data.text,
            title: data.title,
            linked: data.linked,
            tagged: data.tagged,
            authenticationRequiredToView: data.authenticationRequiredToView ?? false
        });
    });
    return notes;
}

const noteWithIdBuilder = (note: NoteWithoutId, id: string): Note => {
    return {
        title: note.title,
        text: note.text,
        linked: note.linked,
        tagged: note.tagged,
        authenticationRequiredToView: note.authenticationRequiredToView,
        id: id
    };
}

const noteWithoutIdBuilder = (note: Note): NoteWithoutId => {
    return {
        title: note.title,
        text: note.text,
        linked: note.linked,
        tagged: note.tagged,
        authenticationRequiredToView: note.authenticationRequiredToView
    };
}