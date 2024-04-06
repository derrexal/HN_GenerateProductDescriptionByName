import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api/ApiService';

export const fetchDataAsync = createAsyncThunk(
    'data/fetchData',
    async () => {
        const response = await fetchData();
        return response;
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dataSlice;
