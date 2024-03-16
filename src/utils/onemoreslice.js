import { createSlice } from "@reduxjs/toolkit";


const onemoreslice = createSlice({
    name: 'app2',
    initialState: {
        ismenuopen: true,
        
    },
    reducers: {
        togglemenu: (state) => {
            state.ismenuopen = !state.ismenuopen;
        },
        closemenu:(state)=>{
            state.ismenuopen=false
        },


    }
});


export const { togglemenu ,closemenu} = onemoreslice.actions;
export default onemoreslice.reducer;





