import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const stars = createSlice({
	name: 'stars',
	initialState,
	reducers: {
		vote: (state, action) => {
			if (!state.value.find(movie => movie.title == action.payload.title))
			{state.value.push(action.payload)}
			else {
				const index = state.value.findIndex(movie => movie.title == action.payload.title)
				state.value[index].stars = action.payload.stars
			}
		}
	},
});

export const { vote } = stars.actions;
export default stars.reducer;
