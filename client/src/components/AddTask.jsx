import axios from "axios";
import { useState } from "react";

export default function AddTask({setTasks}) {
    const [inputTask, setInputTask] = useState("");

    const handleChangeTask = (event) => {
        setInputTask(event.target.value);
    }

    const handleTaskSubmit = (event) => {
        event.preventDefault(); //Prevent page from refreshing
        addTask(inputTask);
        setInputTask("");
    }

    const addTask = async (taskToAdd) => {
        //console.log(taskToAdd);
        const response = await axios.post("http://localhost:5000/api/todos/addTask", {
            task: taskToAdd,
            completed: false
        });
        console.log(response);
        console.log(response.data);
        if (response.status == 200){
            setTasks(prevTasks => {
                return(
                    [
                        ...prevTasks,
                        response.data.resData
                    ]
                )
            })
        }
        else {
            console.log("Unable to add Task")
        }

    }

    return (
        <div className="flex flex-col pt-2">
            <form onSubmit={handleTaskSubmit}>
                <div className="flex flex-col py-5 items-center">
                    <input 
                        className="w-2/3 h-10 p-2 rounded-lg font-semibold text-slate-950 placeholder-slate-500  focus:ring-pink-500 focus:ring-4 focus:outline-none"
                        placeholder="Enter a task!"
                        onChange={handleChangeTask}
                        value={inputTask}
                        required
                    >    
                    </input>
                    <button className="text-white font-bold text-xl w-fit h-fit mt-4 p-4 bg-emerald-600 rounded-lg hover:bg-indigo-950 hover:ring-pink-500 hover:ring-2">+ Add</button>
                </div>
            </form>
        </div>
    )   
}