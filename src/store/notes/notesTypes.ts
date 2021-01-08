export interface NoteWithoutId {
    title: string;
    text: string;
    linked: string[];
    tagged: string[];
}

export interface Note extends NoteWithoutId {
    id: string;
}