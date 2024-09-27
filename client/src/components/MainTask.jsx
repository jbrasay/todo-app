import Task from "./Task";

export default function MainTask({tasks, setTasks, showAll, showActive, ShowCompleted}) {
  //console.log("From Main Task");
  //console.log(tasks);

  const newTasks = tasks.map((data, index) => {
    //console.log("Task Index: ");
    //console.log(index);
    
    if(showAll) {
      return (
        <Task key={data._id} data={data} index={index} setTasks={setTasks}/>
      )
    }
    else if (showActive) {
      if (!data.completed) {
        return <Task key={data._id} data={data} index={index} setTasks={setTasks}/>
      }
    }
    else {
      if (data.completed) {
        return <Task key={data._id} data={data} index={index} setTasks={setTasks}/>
      }
    }
  })

  return (
    <div className="flex flex-col w-full">
      {newTasks}
    </div>
  )
}