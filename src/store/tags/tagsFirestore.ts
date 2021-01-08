import { tagsCollection } from "../firebase";
import { Tag, TagWithoutId } from "./tagsTypes";

export const createTagFirestore = async (tagWithoutId: TagWithoutId): Promise<Tag> => {
    const docReferrence = await tagsCollection.add(tagWithoutId);
    return tagWithIdBuilder(tagWithoutId, docReferrence.id);   
}

export const updateTagFirestore = async (tag: Tag): Promise<void> => {
    await tagsCollection.doc(tag.id).update(tagWithoutIdBuilder(tag));
}

export const deleteTagFirestore = async (id: string): Promise<void> => {
    await tagsCollection.doc(id).delete(); 
}

export const loadTagFirestore = async (): Promise<Tag[]> => {
    const tags: Tag[] = [];
    const snapshot = await tagsCollection.get();
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        tags.push({
            id: doc.id,
            title: data.title
        });
    });
    return tags;
}

const tagWithIdBuilder = (tag: TagWithoutId, id: string): Tag => {
    return {
        title: tag.title,
        id: id
    };
}

const tagWithoutIdBuilder = (tag: Tag): TagWithoutId => {
    return {
        title: tag.title
    };
}