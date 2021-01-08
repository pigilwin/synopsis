import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { Tag } from "./tagsTypes";

interface TagsState {
    tags: Tag[];
    addingNewTag: boolean;
    editingTagId: string;
}

const initialState: TagsState = {
    tags: [],
    addingNewTag: false,
    editingTagId: ''
}

const authSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setTags(state, action: PayloadAction<Tag[]>) {
            const newState = state;
            newState.tags = action.payload;
            return newState;
        },
        addTag(state, action: PayloadAction<Tag>) {
            const newState = state;
            newState.tags.push(action.payload);
            return newState;
        },
        addingNewTag(state, action: PayloadAction<boolean>) {
            const newState = state;
            newState.addingNewTag = action.payload;
            return newState;
        },
        editTag(state, action: PayloadAction<string>) {
            const newState = state;
            newState.editingTagId = action.payload;
            return newState;
        },
        updateTag(state, action: PayloadAction<Tag>) {
            const newState = state;
            newState.tags = newState.tags.filter(tag => tag.id !== action.payload.id);
            newState.tags.push(action.payload);
            return newState;
        },
        deleteTag(state, action: PayloadAction<string>) {
            const newState = state;
            newState.tags = newState.tags.filter(tag => tag.id !== action.payload);
            return newState;
        }
    }
});

export const reducer = authSlice.reducer;
export const {
    setTags,
    addTag,
    editTag,
    updateTag,
    deleteTag,
    addingNewTag
} = authSlice.actions;

export const areWeAddingANewTagSelector = (state: RootState): boolean => state.tagReducer.addingNewTag;
export const tagsSelector = (state: RootState): Tag[] => state.tagReducer.tags;
export const currentTagBeingEditedSelector = (state: RootState): string => state.tagReducer.editingTagId;