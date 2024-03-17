import { createSlice } from "@reduxjs/toolkit";


const commentslice=createSlice({
    name:'comments',
    initialState:{
        cdata:[]
    },
    reducers:{
        generatecomment: (state, action) => {
            if (state.cdata.length >= 15) {
                state.cdata.shift(); // Remove the oldest comment
            }
            state.cdata.push(action.payload); // Push the new comment
        }
    }
})

export const {generatecomment} = commentslice.actions
export  default commentslice.reducer