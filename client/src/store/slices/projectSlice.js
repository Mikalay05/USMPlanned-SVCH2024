import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from '../../services/ProjectService';
import { API_URL } from '../../http/';
import axios from 'axios'

export const getProjects = createAsyncThunk('project/', async () => {
    
    const response = await ProjectService.getProjects();
    return response;
});


const projectSlice = createSlice({
    name: 'project', 
    initialState: {
        projects: {},
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
            .addCase(getProjects.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload; // Сохраняем пользователя
                state.isLoading = false;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;