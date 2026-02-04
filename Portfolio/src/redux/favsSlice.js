import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    isOpen: false
};

const favSlice = createSlice({
    name: "favReducer",
    initialState,
    reducers: {
        toggleFav: (state, action) => {
            const exists = state.items.find((p) => p.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((p) => p.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const { toggleFav } = favSlice.actions;
export default favSlice.reducer;