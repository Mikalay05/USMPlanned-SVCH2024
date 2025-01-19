import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import projectStatusReducer from './slices/projectStatusSlice';
import roleReducer from './slices/roleSlice';
import userReducer from './slices/userSlice';
import customerReducer from './slices/customerSlice';


const store = configureStore({
    reducer: {
        project: projectReducer,
        projectStatus: projectStatusReducer,
        role: roleReducer,
        user: userReducer,
        customer: customerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;