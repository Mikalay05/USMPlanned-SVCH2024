import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from '../../services/ProjectService';
import ProjectDTO from '../../DTOs/ProjectDTO'

export const getProjects = createAsyncThunk('project/getProjects', async () => {
    const response = await ProjectService.getProjects();
    const result = response.map(project => new ProjectDTO(project))

    return result;
});

export const createProject = createAsyncThunk('project/createProject', async (data) => {
    const response = await ProjectService.createProject(data);

    return new ProjectDTO(response);
});

const projectSlice = createSlice({
    name: 'project', 
    initialState: {
        projects: [],
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
