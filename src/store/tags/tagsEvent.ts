import { 
    createTagFirestore, 
    updateTagFirestore, 
    loadTagFirestore, 
    deleteTagFirestore 
} from "./tagsFirestore";
import { AppDispatch, AppThunk } from "../store";
import { 
    addTag, 
    addingNewTag, 
    editTag, 
    setTags, 
    updateTag, 
    deleteTag 
} from "./tagsSlice";
import { Tag, TagWithoutId } from "./tagsTypes";

export const loadTagsAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    const notes = await loadTagFirestore();
    dispatch(setTags(notes));
} 

export const createTagAsync = (title: string): AppThunk => async (dispatch: AppDispatch) => {
    const tag: TagWithoutId = {
        title: title
    };
    const tagWithId = await createTagFirestore(tag);
    dispatch(addTag(tagWithId));
    dispatch(addingNewTag(false));
};

export const updateTagAsync = (tag: Tag): AppThunk => async (dispatch: AppDispatch) => {
    await updateTagFirestore(tag);
    dispatch(updateTag(tag));
    dispatch(editTag(''));
};

export const deleteTagAsync = (tag: Tag): AppThunk => async (dispatch: AppDispatch) => {
    await deleteTagFirestore(tag.id);
    dispatch(deleteTag(tag.id));
    dispatch(editTag(''));
}