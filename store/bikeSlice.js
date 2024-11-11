import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addBike = createAsyncThunk('bike/addBike', async (newBike) => {
    const response = await fetch('https://67319d4c7aaf2a9aff113592.mockapi.io/bike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBike),
    });
    return response.json();
});

export const fetchBikes = createAsyncThunk('bike/fetchBikes', async () => {
    const response = await fetch('https://67319d4c7aaf2a9aff113592.mockapi.io/bike');
    return response.json();
});

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bikes: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.loading = false;
                state.bikes = action.payload;
            })
            .addCase(fetchBikes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBike.fulfilled, (state, action) => {
                state.bikes.push(action.payload);
            });
    },
});

export default bikeSlice.reducer;
