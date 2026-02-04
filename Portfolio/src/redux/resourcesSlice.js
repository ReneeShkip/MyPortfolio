import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    allitems: [],
    filters: [],
    isLoading: false,
    error: null,
    setLang: "",
    showFavoritesOnly: false,
};

const resourcesSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setResources: (state, action) => {
            state.allitems = action.payload;
            state.items = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        getAllFilters: (state) => {
            state.filters = Array.from(new Set(state.allitems.map(item => item.language).filter(Boolean)));
        },
        setFiltering: (state, action) => {
            const language = action.payload;
            if (!language) {
                state.items = state.allitems;
                state.showFavoritesOnly = false;
                state.setLang = ""
            } else {
                state.items = state.allitems.filter(item => item.language === language);
                state.setLang = language;
            }
        },
        toggleShowFavorites: (state) => {
            state.showFavoritesOnly = !state.showFavoritesOnly;
        }
    },
});

export const { setLoading, setResources, setError, getAllFilters, setFiltering, toggleShowFavorites, setLang } = resourcesSlice.actions;
export default resourcesSlice.reducer;