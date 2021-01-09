import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { Note } from "./notesTypes";

interface NoteState {
    notes: Note[];
    addingNewNote: boolean;
    editingNoteId: string;
}

const initialState: NoteState = {
    notes: [],
    addingNewNote: false,
    editingNoteId: ''
}

const authSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes(state, action: PayloadAction<Note[]>) {
            const newState = state;
            newState.notes = action.payload;
            return newState;
        },
        addNote(state, action: PayloadAction<Note>) {
            const newState = state;
            newState.notes.push(action.payload);
            return newState;
        },
        addingNewNote(state, action: PayloadAction<boolean>) {
            const newState = state;
            newState.addingNewNote = action.payload;
            return newState;
        },
        editNote(state, action: PayloadAction<string>) {
            const newState = state;
            newState.editingNoteId = action.payload;
            return newState;
        },
        updateNote(state, action: PayloadAction<Note>) {
            const newState = state;
            newState.notes = newState.notes.filter(note => note.id !== action.payload.id);
            newState.notes.push(action.payload);
            return newState;
        },
        deleteNote(state, action: PayloadAction<string>) {
            const newState = state;
            newState.notes = newState.notes.filter(note => note.id !== action.payload);
            return newState;
        }
    }
});

export const reducer = authSlice.reducer;
export const {
    setNotes,
    addNote,
    editNote,
    updateNote,
    deleteNote,
    addingNewNote
} = authSlice.actions;

export const areWeAddingANewNoteSelector = (state: RootState): boolean => state.noteReducer.addingNewNote;
export const notesSelector = (state: RootState): Note[] => state.noteReducer.notes;
export const currentNoteBeingEditedSelector = (state: RootState): string => state.noteReducer.editingNoteId;