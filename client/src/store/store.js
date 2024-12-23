import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import projectStatusReducer from './slices/projectStatusSlice';


const store = configureStore({
    reducer: {
        project: projectReducer,
        projectStatus: projectStatusReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;