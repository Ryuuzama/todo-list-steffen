import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: boolean;
    created: Date;
  }

function AddTask(){
    const [tasks, setTasks] = useState<Task[]>([]); //the ([]) here is the initial state which is an empty array
    const [userInputTaskName, setUserInputTaskName] = useState<string>('');
    const [userInputTaskDescription, setUserInputTaskDescription] = useState<string>('');

    const makeNewTask = () => {
        if (userInputTaskName.trim() === '') return; //checks if the input is empty. Trim gets rid of white space on both ends as well. the "===" operator compares both value and type.

        const newTask: Task = {
            id: Date.now(),
            title: userInputTaskName,
            description: userInputTaskDescription,
            status: false,
            created: new Date(),
        }

        setTasks([...tasks, newTask]); //the "..." is called a spread operator and it basically copies the task array so we don't modify the original one. setTasks makes a new array (...tasks) and appends the newTask to it. It then replaces the old array in useState with the new one.
        setUserInputTaskName('');
        setUserInputTaskDescription('');
    }

    return (
        <table className='table table-bordered'>
        <thead>
          <tr>
            <th>New Task Name</th>
            <th>New Task Description</th>
          </tr>
          <tr>
            <td>
                <input
                    type="text"
                    value={userInputTaskName}
                    onChange={(event) => setUserInputTaskName(event.target.value)}
                    placeholder="Enter task name"
                >
                    <button onClick={makeNewTask}>Add Task</button>
                </input>
                
            </td>
            <td></td>
          </tr>
        </thead>
      </table>
    )

}

export default AddTask;