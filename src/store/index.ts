import { configureStore } from '@reduxjs/toolkit';
import { movieSlice } from './movieReducer'

export const store = configureStore({
    reducer: { movieSlice }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  