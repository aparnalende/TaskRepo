import React, { useEffect } from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import {v4 as uuid} from 'uuid';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changeStatusValue, deleteTask, getAllTask, getByStatus, setTask } from '../redux/TaskSlice';
import { useNavigate } from 'react-router-dom';

const taskSchema = yup.object().shape({
  
    task_name: yup
      .string()
      .required("Task name is required"),
    description: yup.string().required("Description is required"),
  });

const AddTask=()=>{
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const checkTask = useSelector((state) => state.task);

const [taskData,setTaskData]=useState([
  
]);


 
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(taskSchema),
      });

      useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(taskData))
      },[taskData])

      const onSubmitHandler = (data) => {    
        const id = uuid();
        const newTask = { id, ...data ,status:isChecked }
        setTaskData([...taskData,newTask])
        dispatch(setTask(newTask))

    localStorage.setItem("tasks", JSON.stringify([...taskData, newTask]));
    reset()
   
      };

    
const onClickDelete=(e)=>{

    dispatch(deleteTask(e));

}

const changeStatus=(e)=>{
    dispatch(changeStatusValue({id:e,newData: { status: true }}))
  

    }

console.log("checktask",checkTask)

const onStatusChangeHandler=()=>{
   dispatch(getByStatus())

}
return(
    <>
    <div className="container">
        <div className="form_header flex_between"><h2 className='heading'>Add Task</h2></div>
       

        <div className="main_form flex_between">
            <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
               <div className="form-group">
               <label>Task Name</label>
                <input type="text" autoComplete='off' name="task_name" placeholder='Enter task name' className="task_name" {...register("task_name")}/> <p className='error'>{errors.task_name?.message}</p>
               </div>
               <div className="form-group">
               <label>Description</label>
                <input type="text" autoComplete='off' name="description" placeholder='Enter description' className="description" {...register("description")}/> <p className='error'>{errors.description?.message}</p>
               </div>
               <div className='flex_between'>
               <button type="submit" className="primary_button" >Submit</button>
               
<br/>
             </div>
             </form>
               </div>
               <div className="task_list_wrapper">
            <div className="task_list in_add">
                <header>Task List</header>
                {
                        checkTask.length>=0 &&<div className='div_filter'>
                             <button className='primary_button button_filter' onClick={()=>dispatch(getAllTask())}>All</button>
                            <button className=' primary_button button_filter' onClick={()=>onStatusChangeHandler()}>Completed</button>
                            
                        </div>
                    }
                <table>
                   
                   <thead>
                  
                        <tr>
                            <td>Status</td>
                            <td>ID</td>
                            <td>Task name</td>
                            <td>Description</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        checkTask.map((item,index)=>{
                            return(
                            
                             <tr className={item.status?"disabled":"not_disabled"}>
                              <td > 
                                <button onClick={()=>changeStatus(item.id)} disabled={item.status?true:false} className={item.status?"complete":"pending"}>{item.status?"Completed":"Pending"}</button>
                             </td>
                             <td>{index+1}</td>
                             <td>{item.task_name}</td>
                             <td>{item.description}</td>
                             <td><button className={"delete-button"} onClick={()=>onClickDelete(item.id)} disabled={item.status?true:false}>Delete</button></td>
                         </tr>
                            )
                        })
                       }
                   </tbody>
                </table>

            </div>
                 </div>
           
        </div>
 
    </>
)
}
export default AddTask;




