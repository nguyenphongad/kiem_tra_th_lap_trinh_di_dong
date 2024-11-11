import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './bikeSlice';

export const store = configureStore({
    reducer: {
        bike: bikeReducer,
    },
});

export default store;