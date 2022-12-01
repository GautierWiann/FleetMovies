import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const seriesWatchedSlice = createSlice({
	name: 'seriesWatched',
	initialState,
	reducers: {
		addWatchSerie: (state, action) => {
			state.value.push(action.payload);
		},
		removeWatchSerie: (state, action) => {
			state.value = state.value.filter(serie => serie.title !== action.payload.title);
		},
		removeAllWatchSerie: (state) => {
			state.value = [];
		},
	},
});

export const { addWatchSerie, removeWatchSerie, removeAllWatchSerie } = seriesWatchedSlice.actions;
export default seriesWatchedSlice.reducer;
