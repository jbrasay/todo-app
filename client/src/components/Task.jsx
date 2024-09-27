import axios from "axios";
import { useState } from "react"

export default function Task({data, index, setTasks}) {
    const [isEditing, setIsEditing] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(data.task);

    //Send edited task to the database and update state tasks
    const handleEditing = async (taskId) => {
        console.log(dataToEdit.length);
        if(isEditing && dataToEdit.length > 0) {
            const response = await axios.patch(`http://localhost:5000/api/todos/editTask/${taskId}`, {
                task: dataToEdit
            });
            if (response.status == 200) {
                setTasks(prevTasks => {
                    prevTasks.find(data => data._id == taskId).task = dataToEdit;
                    return prevTasks;
                })
            }
            else {
                console.log("Could not edit task!");
            }

            //Save and set to false
            setIsEditing(false)
        }
        else {
            setIsEditing(true);
        }
    }

    //Store user input to state variable
    const handleEditedData = (e) => {
        setDataToEdit(e.target.value);
    }

    //When input is focused, and enter key is pressed, run handleEditing function
    const handleEnterPressed = (e, taskId) => {
        if (e.key === 'Enter') {
            handleEditing(taskId);
        }
    }


    //Delete task, call delete api to delete task from the database and update state task variable
    const deleteTask = async (taskId) => {
        const response = await axios.delete(`http://localhost:5000/api/todos/removeTask/${taskId}`);
        if (response.status == 200) {
            setTasks((prevTasks) => {
                return prevTasks.filter((task) => (task._id != taskId));
            })
        }
        else {
            console.log("Unable to delete task");
        }

    }

     //Update database completed status and state tasks completed status to true
    const completeTask = async (taskId, status) => {
        //console.log("complete Task");
        //console.log(status);
        
        //console.log("Completing Task!");
        const response = await axios.patch(`http://localhost:5000/api/todos/completeTask/${taskId}`, {
            completed: true
        });
        if (response.status == 200) {
            setTasks(prevTasks => {
                return prevTasks.map((taskObj) => {
                    if(taskObj._id === taskId) {
                        taskObj = {...taskObj, completed: true}
                        //console.log(taskObj);
                    }
                    return taskObj;
                })
            })
        }
        else {
            console.log("Could not Complete task!");
        }
    }

    //Update database completed status and state tasks completed status to false
    const setTaskToActive = async (taskId, status) => {
        console.log("Setting task to active!");
        const response = await axios.patch(`http://localhost:5000/api/todos/completeTask/${taskId}`, {
            completed: false
        });
        if (response.status == 200) {
            setTasks(prevTasks => {
                return prevTasks.map((taskObj) => {
                    if(taskObj._id === taskId) {
                        taskObj = {...taskObj, completed: false}
                        //console.log(taskObj)
                    }
                    return taskObj;
                })
            })
        }
        else {
            console.log("Could not set task to active!");
        }
        //console.log(response);
    }

    return (
        <div className="flex flex-row justify-between w-full p-4 m-2 text-white font-semibold bg-pink-900 rounded-lg shadow-xl border">
            <div className="flex flex-row items-center w-10/12">
                {isEditing ? 
                    <input value={dataToEdit} onChange={handleEditedData} onKeyDown={(e)=>handleEnterPressed(e, data._id)} type="text" placeholder="Please enter a task, to save!" className="ml-5 w-1/2 pl-1 py-1 rounded-sm text-slate-950 placeholder-slate-500  focus:ring-pink-500 focus:ring-4 focus:outline-none" required /> : 
                    <p className={"ml-5 w-fit" + (data.completed ? ' line-through decoration-indigo-950 decoration-4' : '')}>{data.task}</p>
                }
                {isEditing ? 
                    <button className="ml-5 text-sm w-fit p-2 font-bold bg-emerald-600 rounded-sm hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500" onClick={() => handleEditing(data._id)}>Save 💾</button> : 
                    <button className={"ml-5 text-sm w-fit p-2 font-bold bg-emerald-600 rounded-sm hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500" + (data.completed ? ' hidden' : '')} onClick={() => handleEditing(data._id)} disabled={data.completed ? true : false} >Edit ✏️</button>
                }
            </div>
            <div className=" flex flex-row">
                {data.completed ?
                    <button className="mr-5 text-sm w-fit p-2 font-bold bg-emerald-600 rounded-sm  hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500" onClick={()=> setTaskToActive(data._id, data.completed)}>⎌ Undo</button> :
                    <button className={"mr-5 text-sm w-fit p-2 font-bold bg-emerald-600 rounded-sm  hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500" + (isEditing ? ' hidden' : '')} onClick={()=> completeTask(data._id, data.completed)}>🗸 Complete</button> 
                }
                <button className="mr-4 text-2xl font-semibold hover:text-red-500" onClick={()=>deleteTask(data._id)}>X</button>
            </div>
      </div>
    )
}