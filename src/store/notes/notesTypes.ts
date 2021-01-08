export interface NoteWithoutId {
    title: string;
    content: string;
    linked: string[];
    tagged: string[];
}

export interface Note extends NoteWithoutId {
    id: string;
}