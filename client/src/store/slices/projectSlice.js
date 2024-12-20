import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from '../../services/ProjectService';

export const getProjects = createAsyncThunk('project/getProjects', async () => {
    console.log("GET PROJECTS in PROJECT SLICE");
    const response = await ProjectService.getProjects();
    console.log("API Response in getProjects:", response);

    return response.data; // Возвращаем массив проектов
});

const projectSlice = createSlice({
    name: 'project', 
    initialState: {
        projects: [], // projects по умолчанию массив
        isLoading: false,
    },
    reducers: {
        setProjects(state, action) {
            state.projects = action.payload;
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => { 
        builder
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = Array.isArray(action.payload) ? action.payload : []; // Убедитесь, что это массив
                state.isLoading = false;
            })
            .addCase(getProjects.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;
