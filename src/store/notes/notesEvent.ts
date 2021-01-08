import { 
    createNoteFirestore, 
    updateNoteFirestore, 
    loadNotesFirestore, 
    deleteNoteFirestore 
} from "../firebase";
import { AppDispatch, AppThunk } from "../store";
import { 
    addNote, 
    addingNewNote, 
    editNote, 
    setNotes, 
    updateNote, 
    deleteNote 
} from "./notesSlice";
import { Note, NoteWithoutId } from "./notesTypes";

export const loadNotesAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    const notes = await loadNotesFirestore();
    dispatch(setNotes(notes));
} 

export const createNoteAsync = (title: string, text: string): AppThunk => async (dispatch: AppDispatch) => {
    const blog: NoteWithoutId = {
        title: title,
        text: text,
        linked: [],
        tagged: []
    };
    const blogWithId = await createNoteFirestore(blog);
    dispatch(addNote(blogWithId));
    dispatch(addingNewNote(false));
};

export const updateNoteAsync = (note: Note): AppThunk => async (dispatch: AppDispatch) => {
    await updateNoteFirestore(note);
    dispatch(updateNote(note));
    dispatch(editNote(''));
};

export const deleteNoteAsync = (note: Note): AppThunk => async (dispatch: AppDispatch) => {
    await deleteNoteFirestore(note.id);
    dispatch(deleteNote(note.id));
    dispatch(editNote(''));
}