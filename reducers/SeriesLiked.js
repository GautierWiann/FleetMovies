import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const seriesLikedSlice = createSlice({
	name: 'seriesLiked',
	initialState,
	reducers: {
		addLikeSerie: (state, action) => {
			state.value.push(action.payload);
		},
		removeLikeSerie: (state, action) => {
			state.value = state.value.filter(serie => serie.title !== action.payload.title);
		},
		removeAllLikesSerie: (state) => {
			state.value = [];
		},
	},
});

export const { addLikeSerie, removeLikeSerie, removeAllLikesSerie } = seriesLikedSlice.actions;
export default seriesLikedSlice.reducer;
