import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import projectStatusReducer from './slices/projectStatusSlice';
import roleReducer from './slices/roleSlice';
import userReducer from './slices/userSlice';
import customerReducer from './slices/customerSlice';
import epicReducer from './slices/epicSlice';
import storyReducer from './slices/storySlice';
import taskReducer from './slices/taskSlice';


const store = configureStore({
    reducer: {
        project: projectReducer,
        projectStatus: projectStatusReducer,
        role: roleReducer,
        user: userReducer,
        customer: customerReducer,
        epic: epicReducer,
        story: storyReducer,
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;