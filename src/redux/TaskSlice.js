import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name: "Task",
    initialState:[],
    reducers: {
        setTask: (state, action) => {
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
                    return state.filter((todo) => todo.id !== action.payload);
                  },
        changeStatusValue:(state,action)=>{
            const { id, newData } = action.payload;
           

            const updatedData = state.map((item) => {
                if (item.id == id) {
                
                  return { ...item, status: true };
                }
                return item;
              });
             return updatedData;
        },
        getByStatus:(state,action)=>{
           return state.filter((todo)=>todo.status!==false)

        },
        getAllTask:(state,action)=>{
            return state.filter((todo)=>todo.id!==true);
        }
    },
});
// this is for dispatch action
export const {
    setTask,
    changeStatusValue,
    getTasks,deleteTask,
    getByStatus,
    getAllTask
} = taskSlice.actions;
export default taskSlice.reducer;
