"use client"
import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created: Date;
  }

//CREATE function
function AddTask({ tasks, setTasks }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }){ //React.Dispatch is used in case we ever pass in just an array or a function that returns a new array.

  const [userInputTaskName, setUserInputTaskName] = useState<string>('');
  const [userInputTaskDescription, setUserInputTaskDescription] = useState<string>('');
    const makeNewTask = () => {
        if (userInputTaskName.trim() === '') return; //checks if the input is empty. Trim gets rid of white space on both ends as well. the "===" operator compares both value and type.

        const newTask: Task = {
            id: Date.now(),
            title: userInputTaskName,
            description: userInputTaskDescription,
            completed: false,
            created: new Date(),
        }

        setTasks([...tasks, newTask]); //the "..." is called a spread operator and it basically copies the task array so we don't modify the original one. setTasks makes a new array (...tasks) and appends the newTask to it. It then replaces the old array in useState with the new one.
        setUserInputTaskName('');
        setUserInputTaskDescription('');
    }

    return (
        <div>
          <div>love</div>
          <table className='table table-bordered mb-5'>
          <thead>
            <tr className="p-20">
              <td>
                  <input
                      type="text"
                      className="text-base p-1"
                      value={userInputTaskName}
                      onChange={(event) => setUserInputTaskName(event.target.value)}
                      placeholder="Enter task name"
                      />
                  
              </td>
              <td>
                  <input
                    type="text"
                    className="text-base p-1 w-[260px]"
                    value={userInputTaskDescription}
                    onChange={(event) => setUserInputTaskDescription(event.target.value)}
                    placeholder="Enter task description (optional)"
                    />
              </td>
              <td>
              <button className="text-white text-base btn btn-wide bg-primary hover:bg-accent"onClick={makeNewTask}>Add Task</button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    )

}

//DELETE function
function handleDelete({ tasks, setTasks, id }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>>; id: number }){
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //the ([]) here is the initial state which is an empty array
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedUserInputTaskName, setUserInputEditedTaskName] = useState<string>("");
  const [editedUserInputTaskDescription, setUserInputEditedTaskDescription] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all"); //used for filtering tasks. the "("all")" at the end of the line is the initialization

  //UPDATE functions
  const handleNameClick = (task: Task) => {
    //selects the task id that you clicked
    setEditingTaskId(task.id);
    setUserInputEditedTaskName(task.title);
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //changes the task name in the actual task object of the tasks array. We need this function to keep track of the React state of userInputEditedTaskName. <input /> updates the instance of userInputEditedTaskName, but we need to do it in the react state as well.
    setUserInputEditedTaskName(event.target.value);
  
  }
  const handleNameSubmit = (taskId: number) => {
    //uses setTasks to actually make a new array of tasks as the current array, while also changing the title if editedTaskId is the same as one of the taskId's it is looping through with .map
    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? {...task, title: editedUserInputTaskName }: task)); //prevTasks is just a name to represent the old task array (react requires this array when doing setTasks). Then we loop through it with .map, and for each "task" we check if the id matches the taskId we passed in (which is the task we are editing. then we change the title to the new title.) "...task" is the new task we will update.

    setEditingTaskId(null);
  }

  const handleDescriptionClick = (task: Task) => {
    //selects the task id that you clicked
    setEditingTaskId(task.id);
    setUserInputEditedTaskDescription(task.description);
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //changes the task name in the actual task object of the tasks array. We need this function to keep track of the React state of userInputEditedTaskName. <input /> updates the instance of userInputEditedTaskName, but we need to do it in the react state as well.
    setUserInputEditedTaskDescription(event.target.value);
  
  }
  const handleDescriptionSubmit = (taskId: number) => {
    //uses setTasks to actually make a new array of tasks as the current array, while also changing the title if editedTaskId is the same as one of the taskId's it is looping through with .map
    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? {...task, description: editedUserInputTaskDescription }: task)); //prevTasks is just a name to represent the old task array (react requires this array when doing setTasks). Then we loop through it with .map, and for each "task" we check if the id matches the taskId we passed in (which is the task we are editing. then we change the title to the new title.) "...task" is the new task we will update.

    setEditingTaskId(null);
  }

  const handleCompleted = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? {...task, completed: !task.completed }: task));
  }

  //FILTER functions
  const filteredTasks = tasks.filter(task => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "pending") return !task.completed;
  });

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary p-5 pb-10">Dan&apos;s Task Manager</h1>

      {/* Filter buttons! */}
      <div>
      <button className={`py-2 px-4 rounded hover:bg-accent ${
      filterStatus === "all" ? "btn btn-primary m-2" : "bg-neutral m-2"
    }`} onClick={() => setFilterStatus("all")}>Show All</button>
      <button className={`py-2 px-4 rounded hover:bg-accent ${
      filterStatus === "completed" ? "btn btn-primary m-2" : "bg-neutral m-2"
    }`} onClick={() => setFilterStatus("completed")}>Show Completed</button>
      <button className={`py-2 px-4 rounded hover:bg-accent ${
      filterStatus === "pending" ? "btn btn-primary m-2" : "bg-neutral m-2"
    }`} onClick={() => setFilterStatus("pending")}>Show Pending</button>
      </div>
      <AddTask tasks={tasks} setTasks={setTasks} />
      <table className='table table-bordered bg-neutral'>
        <thead className="text-white text-base">
          <tr className="bg-primary">
            <th>Task Name</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Completed?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => 
          <tr 
            key={task.id}
            style={ {textDecoration: task.completed ? "line-through": "none"}}>
            <td>
              {editingTaskId === task.id ? (
                <input 
                  type="text"
                  value={editedUserInputTaskName}
                  onChange={(event) => handleNameChange(event)} 
                  onBlur={() => handleNameSubmit(task.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleNameSubmit(task.id);
                    }
                  }}
                  autoFocus
                                 />
              ) : (
                <span onClick={() => handleNameClick(task)}>{task.title}</span>
              )
              
              }
            </td>
            <td>
            {editingTaskId === task.id ? (
                <input 
                  type="text"
                  value={editedUserInputTaskDescription}
                  onChange={(event) => handleDescriptionChange(event)} 
                  onBlur={() => handleDescriptionSubmit(task.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleDescriptionSubmit(task.id);
                    }
                  }}
                  autoFocus
                                 />
              ) : (
                <span onClick={() => handleDescriptionClick(task)}>{task.description}</span>
              )
              
              }
            </td>
            <td>{task.created.toLocaleString()}</td>
            <td>
            <input type="checkbox" checked={task.completed} className="checkbox bg-base-100" onChange={() => handleCompleted(task.id)} />
            </td>

            <td>
            <button className="btn" onClick={() => handleDelete({ tasks, setTasks, id: task.id})}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App;