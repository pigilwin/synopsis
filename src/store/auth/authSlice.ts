import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

interface AuthState {
    authId: string;
    attemptingAuth: boolean;
}

const initialState: AuthState = {
    authId: '',
    attemptingAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsCurrentlyAttemptingAuth(state, action: PayloadAction<boolean>) {
            const newState = state;
            newState.attemptingAuth = action.payload;
            return newState;
        },
        setAuthId(state, action: PayloadAction<string>) {
            const newState = state;
            state.authId = action.payload;
            return newState;
        }
    }
});

export const reducer = authSlice.reducer;
export const {
    setAuthId,
    setIsCurrentlyAttemptingAuth
} = authSlice.actions;

export const isAuthenticatedSelector = (state: RootState): boolean => state.authReducer.authId.length > 0;
export const isAttemptingAuthSelector = (state: RootState): boolean => state.authReducer.attemptingAuth;