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


// Cập nhật thông tin một xe đạp
export const updateBike = createAsyncThunk('bike/updateBike', async ({ id, updatedData }) => {
    const response = await fetch(`https://67319d4c7aaf2a9aff113592.mockapi.io/bike/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    return response.json();
});

// Xoá một xe đạp
export const deleteBike = createAsyncThunk('bike/deleteBike', async (id) => {
    await fetch(`https://67319d4c7aaf2a9aff113592.mockapi.io/bike/${id}`, {
        method: 'DELETE',
    });
    return id; // Trả lại ID của xe đã xóa
});

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bikes: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBikes.fulfilled, (state, action) => {
                state.bikes = action.payload;
            })
            .addCase(addBike.fulfilled, (state, action) => {
                state.bikes.push(action.payload);
            })
            .addCase(updateBike.fulfilled, (state, action) => {
                const index = state.bikes.findIndex((bike) => bike.id === action.payload.id);
                if (index !== -1) {
                    state.bikes[index] = action.payload; // Cập nhật xe đã chỉnh sửa
                }
            })
            .addCase(deleteBike.fulfilled, (state, action) => {
                state.bikes = state.bikes.filter((bike) => bike.id !== action.payload); // Xóa xe khỏi danh sách
            });
    },
});

export default bikeSlice.reducer;
