export interface TagWithoutId {
    title: string;
}

export interface Tag extends TagWithoutId {
    id: string;
}