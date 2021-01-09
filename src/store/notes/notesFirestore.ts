import { notesCollection } from "../firebase";
import { Note, NoteWithoutId } from "./notesTypes";

export const createNoteFirestore = async (blogWithoutId: NoteWithoutId): Promise<Note> => {
    const docReferrence = await notesCollection.add(blogWithoutId);
    return noteWithIdBuilder(blogWithoutId, docReferrence.id);   
}

export const updateNoteFirestore = async (blog: Note): Promise<void> => {
    await notesCollection.doc(blog.id).update(noteWithoutIdBuilder(blog)); 
}

export const deleteNoteFirestore = async (id: string): Promise<void> => {
    await notesCollection.doc(id).delete(); 
}

export const loadNotesFirestore = async (): Promise<Note[]> => {
    const blogs: Note[] = [];
    const snapshot = await notesCollection.get();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        blogs.push({
            id: doc.id,
            text: data.text,
            title: data.title,
            linked: data.linked,
            tagged: data.tagged,
            authenticationRequiredToView: data.authenticationRequiredToView ?? false
        });
    });
    return blogs;
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