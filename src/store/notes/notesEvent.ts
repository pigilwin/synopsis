import { 
    createNoteFirestore, 
    updateNoteFirestore, 
    loadNotesFirestore, 
    deleteNoteFirestore 
} from "./notesFirestore";
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

export const createNoteAsync = (note: NoteWithoutId): AppThunk => async (dispatch: AppDispatch) => {
    const noteWithId = await createNoteFirestore(note);
    dispatch(addNote(noteWithId));
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