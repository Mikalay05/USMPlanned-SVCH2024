import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';

const store = configureStore({
    reducer: {
        project: projectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;