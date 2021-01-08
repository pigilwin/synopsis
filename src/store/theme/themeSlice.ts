import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

const initialState: boolean = false;

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<boolean>) {
            return action.payload;
        }
    }
});

export const reducer = themeSlice.reducer;
export const {
    setTheme
} = themeSlice.actions;
export const themeStateSelector = (state: RootState) => state.themeReducer;