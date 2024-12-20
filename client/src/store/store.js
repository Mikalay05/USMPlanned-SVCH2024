import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        project: projectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;