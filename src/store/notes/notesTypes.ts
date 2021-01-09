export interface NoteWithoutId {
    title: string;
    text: string;
    linked: string[];
    tagged: string[];
    authenticationRequiredToView: boolean;
}

export interface Note extends NoteWithoutId {
    id: string;
}

export const emptyNote: Note = {
    id: '', 
    title: '', 
    text: '', 
    tagged: [], 
    linked: [], 
    authenticationRequiredToView: false
};