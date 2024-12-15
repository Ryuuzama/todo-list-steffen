"use client";
import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "../lib/api/tasks";

interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]); //the ([]) here is the initial state which is an empty array
  const [userInputTaskName, setUserInputTaskName] = useState<string>("");
  const [userInputTaskDescription, setUserInputTaskDescription] = useState<
    string | ""
  >("");
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editingDescriptionId, setEditingDescriptionId] = useState<
    string | null
  >(null);
  const [editedUserInputTaskName, setUserInputEditedTaskName] =
    useState<string>("");
  const [editedUserInputTaskDescription, setUserInputEditedTaskDescription] =
    useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "pending"
  >("all"); //used for filtering tasks. the "("all")" at the end of the line is the initialization

  //READ
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(); // Call the API function
        setTasks(data); // Update local state with fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks();
  }, []);

  //CREATE
  const handleAddTask = async (title: string, description: string | null) => {
    try {
      //checking for whitespace
      if (title.trim() === "") return;
      //calls api to make a new task object
      const newTask = await addTask(title, description);

      // just updating local state with the new task object
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //DELETE
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  //UPDATE constants-------------

  const handleNameClick = (task: Task) => {
    //selects the task id that you clicked
    setEditingNameId(task.id);
    setUserInputEditedTaskName(task.title);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //changes the task name in the actual task object of the tasks array. We need this function to keep track of the React state of userInputEditedTaskName. <input /> updates the instance of userInputEditedTaskName, but we need to do it in the react state as well.
    setUserInputEditedTaskName(event.target.value);
  };
  const handleNameSubmit = async (
    taskId: string,
    updatedData: Partial<Task>
  ) => {
    //uses setTasks to actually make a new array of tasks as the current array, while also changing the title if editedTaskId is the same as one of the taskId's it is looping through with .map
    await updateTask(taskId, updatedData);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: editedUserInputTaskName } : task
      )
    ); //prevTasks is just a name to represent the old task array (react requires this array when doing setTasks). Then we loop through it with .map, and for each "task" we check if the id matches the taskId we passed in (which is the task we are editing. then we change the title to the new title.) "...task" is the new task we will update.

    setEditingNameId(null);
  };

  const handleDescriptionClick = (task: Task) => {
    //selects the task id that you clicked
    setEditingDescriptionId(task.id);
    setUserInputEditedTaskDescription(task.description || "");
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //changes the task name in the actual task object of the tasks array. We need this function to keep track of the React state of userInputEditedTaskName. <input /> updates the instance of userInputEditedTaskName, but we need to do it in the react state as well.
    setUserInputEditedTaskDescription(event.target.value);
  };
  const handleDescriptionSubmit = async (
    taskId: string,
    updatedData: Partial<Task>
  ) => {
    //uses setTasks to actually make a new array of tasks as the current array, while also changing the title if editedTaskId is the same as one of the taskId's it is looping through with .map
    await updateTask(taskId, updatedData);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, description: editedUserInputTaskDescription }
          : task
      )
    ); //prevTasks is just a name to represent the old task array (react requires this array when doing setTasks). Then we loop through it with .map, and for each "task" we check if the id matches the taskId we passed in (which is the task we are editing. then we change the title to the new title.) "...task" is the new task we will update.

    setEditingDescriptionId(null);
  };

  const handleCompleted = async (
    taskId: string,
    updatedData: Partial<Task>
  ) => {
    await updateTask(taskId, updatedData);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //FILTER functions----------------

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "pending") return !task.completed;
  });

  //Rendering----------------

  return (
    <div>
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary p-5 pb-10">
          Dan&apos;s Task Manager
        </h1>
      </div>
      {/* Filter buttons! */}
      <div>
        <button
          className={`py-2 px-4 rounded hover:bg-accent ${
            filterStatus === "all" ? "btn btn-primary m-2" : "bg-neutral m-2"
          }`}
          onClick={() => setFilterStatus("all")}
        >
          Show All
        </button>
        <button
          className={`py-2 px-4 rounded hover:bg-accent ${
            filterStatus === "completed"
              ? "btn btn-primary m-2"
              : "bg-neutral m-2"
          }`}
          onClick={() => setFilterStatus("completed")}
        >
          Show Completed
        </button>
        <button
          className={`py-2 px-4 rounded hover:bg-accent ${
            filterStatus === "pending"
              ? "btn btn-primary m-2"
              : "bg-neutral m-2"
          }`}
          onClick={() => setFilterStatus("pending")}
        >
          Show Pending
        </button>
      </div>
      <div>
        {" "}
        {/*create task*/}
        <table className="table table-bordered mb-5">
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
                  onChange={(event) =>
                    setUserInputTaskDescription(event.target.value)
                  }
                  placeholder="Enter task description (optional)"
                />
              </td>
              <td>
                <button
                  className="text-white text-base btn btn-wide bg-primary hover:bg-accent"
                  onClick={() =>
                    handleAddTask(userInputTaskName, userInputTaskDescription)
                  }
                >
                  Add Task
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table className="table table-bordered bg-neutral">
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
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <td>
                  {editingNameId === task.id ? (
                    <input
                      type="text"
                      value={editedUserInputTaskName}
                      className="bg-primary"
                      onChange={(event) => handleNameChange(event)}
                      onBlur={() =>
                        handleNameSubmit(task.id, {
                          title: editedUserInputTaskName,
                        })
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleNameSubmit(task.id, {
                            title: editedUserInputTaskName,
                          });
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleNameClick(task)}>
                      {task.title}
                    </span>
                  )}
                </td>
                <td>
                  {editingDescriptionId === task.id ? (
                    <input
                      type="text"
                      value={editedUserInputTaskDescription}
                      className="bg-primary"
                      onChange={(event) => handleDescriptionChange(event)}
                      onBlur={() =>
                        handleDescriptionSubmit(task.id, {
                          description: editedUserInputTaskDescription,
                        })
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleDescriptionSubmit(task.id, {
                            description: editedUserInputTaskDescription,
                          });
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => handleDescriptionClick(task)}>
                      {task.description}
                    </span>
                  )}
                </td>
                <td>{task.createdAt.toLocaleString()}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="checkbox bg-base-100"
                    onChange={() =>
                      handleCompleted(task.id, { completed: !task.completed })
                    }
                  />
                </td>

                <td>
                  <button className="btn" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
