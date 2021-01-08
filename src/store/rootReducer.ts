import { combineReducers } from '@reduxjs/toolkit';
import { reducer as themeReducer } from './theme/themeSlice';
import { reducer as authReducer } from './auth/authSlice';
import { reducer as blogReducer } from './notes/notesSlice';
import { reducer as tagReducer } from './tags/tagsSlice';

export const rootReducer = combineReducers({
    themeReducer,
    authReducer,
    blogReducer,
    tagReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;