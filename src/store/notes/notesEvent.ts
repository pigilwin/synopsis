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
    const blogs = await loadNotesFirestore();
    dispatch(setNotes(blogs));
} 

export const createNoteAsync = (title: string, content: string): AppThunk => async (dispatch: AppDispatch) => {
    const blog: NoteWithoutId = {
        title: title,
        content: content,
        date: (new Date()).toISOString()
    };
    const blogWithId = await createNoteFirestore(blog);
    dispatch(addNote(blogWithId));
    dispatch(addingNewNote(false));
};

export const updateNoteAsync = (blog: Note): AppThunk => async (dispatch: AppDispatch) => {
    await updateNoteFirestore(blog);
    dispatch(updateNote(blog));
    dispatch(editNote(''));
};

export const deleteNoteAsync = (blog: Note): AppThunk => async (dispatch: AppDispatch) => {
    await deleteNoteFirestore(blog.id);
    dispatch(deleteNote(blog.id));
    dispatch(editNote(''));
}