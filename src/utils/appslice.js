import { createSlice } from "@reduxjs/toolkit";


const appslice = createSlice({
    name: 'app1',
    initialState: {
        ismenuopen: true,
        searchResults: [], 
    },
    reducers: {
        togglemenu: (state) => {
            state.ismenuopen = !state.ismenuopen;
        },
        closemenu:(state)=>{
            state.ismenuopen=false
        },

        SearchResults: (state, action)=>{
            state.searchResults = action.payload;
        },

    }
});


export const { togglemenu ,closemenu,SearchResults} = appslice.actions;
export default appslice.reducer;





