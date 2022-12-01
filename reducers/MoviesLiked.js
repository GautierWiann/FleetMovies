import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const moviesLikedSlice = createSlice({
	name: 'moviesLiked',
	initialState,
	reducers: {
		addLike: (state, action) => {
			state.value.push(action.payload);
		},
		removeLike: (state, action) => {
			state.value = state.value.filter(movie => movie.title !== action.payload.title);
		},
		removeAllLikes: (state) => {
			state.value = [];
		},
	},
});

export const { addLike, removeLike, removeAllLikes } = moviesLikedSlice.actions;
export default moviesLikedSlice.reducer;
