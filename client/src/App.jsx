import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import AddTask from './components/AddTask';
import MainTask from './components/MainTask';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showActive, setShowActive] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleshowActive = () => {
    setShowActive(true);
    setShowAll(false);
    setShowCompleted(false);

  }

  const handleShowAll = () => {
    setShowAll(true);
    setShowActive(false);
    setShowCompleted(false);
  }

  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowAll(false);
    setShowActive(false);
  }
  //With AXIOS
  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("http://localhost:5000/api/todos/getAllTask");
      const data = response.data;
      //console.log(response);
      //console.log(data);
      //console.log("hello");
      console.log("Storing Tasks");
      setTasks(data)
    }
    getTasks();
  },[]);

  console.log("Length");
  console.log(tasks.length);
  return (
    <div className="flex flex-col h-screen items-center bg-stone-300">
      {/*Display the Add component */}
      <div className="flex flex-col w-2/4 bg-pink-900 mt-24 rounded-2xl shadow-2xl">
        <h1 className=" text-center font-black text-3xl text-white py-3.5 rounded-t-2xl bg-pink-950">ToDo App</h1>
        <AddTask setTasks={setTasks}/>
        <div className="flex flex-row p-4 [&_button]:w-fit [&_button]:h-fit [&_button]:p-2 items-center justify-center rounded-b-2xl bg-pink-950">
          <button onClick={handleShowAll} className={"text-white font-medium text-sm hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500 mx-1" + (showAll ? ' bg-indigo-950 ring-2 ring-pink-500' : ' bg-emerald-600')}>All</button>
          <button onClick={handleshowActive} className={"text-white font-medium  text-sm  hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500 mx-1" + (showActive ? ' bg-indigo-950 ring-2 ring-pink-500' : ' bg-emerald-600')}>Active</button>
          <button onClick={handleShowCompleted} className={"text-white font-medium  text-sm hover:bg-indigo-950 hover:ring-2 hover:ring-pink-500 mx-1" + (showCompleted ? ' bg-indigo-950 ring-2 ring-pink-500' : ' bg-emerald-600')}>Completed</button>
        </div>
      </div>
      <div className="flex flex-col w-2/4 mt-20">
        {(tasks.length > 0) && <MainTask tasks={tasks} setTasks={setTasks} showAll={showAll} showActive={showActive} showCompleted={showCompleted}/>}
      </div>

    </div>
  );
}