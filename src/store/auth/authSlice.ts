import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

interface AuthState {
    authId: string;
}

const initialState: AuthState = {
    authId: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthId(state, action: PayloadAction<string>) {
            const newState = state;
            state.authId = action.payload;
            return newState;
        }
    }
});

export const reducer = authSlice.reducer;
export const {
    setAuthId
} = authSlice.actions;

export const isAuthenticatedSelector = (state: RootState): boolean => state.authReducer.authId.length > 0;