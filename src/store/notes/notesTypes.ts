export interface NoteWithoutId {
    title: string;
    content: string;
    date: string;
}

export interface Note extends NoteWithoutId {
    id: string;
}