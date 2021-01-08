export interface BlogWithoutId {
    title: string;
    content: string;
    date: string;
}

export interface Blog extends BlogWithoutId {
    id: string;
}