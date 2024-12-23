import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from '../../services/ProjectService';
import ProjectDTO from '../../DTOs/ProjectDTO'

export const getProjects = createAsyncThunk('project/getProjects', async () => {
    const response = await ProjectService.getProjects();

    return response.map(project => new ProjectDTO(project));; // Возвращаем массив проектов
});
export const getProjectStatuses = createAsyncThunk('project/getProjectStatuses', async()=> {
    const response = await ProjectService.getProjects();
    return response; // Возвращаем массив проектов
})

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
