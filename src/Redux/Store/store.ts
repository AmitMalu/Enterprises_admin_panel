import {configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/Reducer';
import menuReducer from '../Features/Menu/MenuReducer';

export const store = configureStore({
    reducer : {
        auth : authReducer,
        menu : menuReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;