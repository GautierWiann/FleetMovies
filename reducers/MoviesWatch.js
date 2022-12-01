import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const moviesWatchedSlice = createSlice({
	name: 'moviesWatched',
	initialState,
	reducers: {
		addWatched: (state, action) => {
			state.value.push(action.payload);
		},
		removeWatched: (state, action) => {
			state.value = state.value.filter(movie => movie.title !== action.payload.title);
		},
		removeAllWatched: (state) => {
			state.value = [];
		},
	},
});

export const { addWatched, removeWatched, removeAllWatched } = moviesWatchedSlice.actions;
export default moviesWatchedSlice.reducer;
