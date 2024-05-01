import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    genresList: null
};

const genresListSlice = createSlice({
    name: 'genresList',
    initialState,
    reducers: {
        setGenresList: (state, action) => {
        state.genresList = action.payload;
    }
    }
});

export const { setGenresList } = genresListSlice.actions;
export default genresListSlice.reducer;