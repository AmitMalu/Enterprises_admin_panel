import {configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthReducer';
import menuReducer from '../reducers/MenuReducer';

export const store = configureStore({
    reducer : {
        auth : authReducer,
        menu : menuReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;