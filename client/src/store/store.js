import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import projectStatusReducer from './slices/projectStatusSlice';
import roleReducer from './slices/roleSlice';


const store = configureStore({
    reducer: {
        project: projectReducer,
        projectStatus: projectStatusReducer,
        role: roleReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;