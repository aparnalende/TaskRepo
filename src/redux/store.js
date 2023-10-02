import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice";

export const store = configureStore({
    reducer: {
        task: taskSlice,
    },
});

