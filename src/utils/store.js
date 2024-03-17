import { configureStore } from "@reduxjs/toolkit";
import appslice from "./appslice";
import onemoreslice from "./onemoreslice";
import commentslice from "./commentslice";

const store=configureStore({
    reducer:{
        app1:appslice,
        app2:onemoreslice,
        Comment:commentslice
    }
})

export default store

