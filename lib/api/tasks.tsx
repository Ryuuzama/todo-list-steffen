import { Task } from "lib/types";

export const fetchTasks = async () => {
  //don't need to specify "GET" here because it is the default method
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  return response.json();
};

export const addTask = async (title: string, description: string | null) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //basically saysing the request contains JSON data
    body: JSON.stringify({ title, description }), //this is the actual data, converting the javascript object into a json string
  });
  if (!response.ok) {
    throw new Error(`Error adding task: ${response.statusText}`);
  }
  return response.json(); //make the response body json and returns a promise
};

export const updateTask = async (id: string, updatedData: Partial<Task>) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting task: ${response.statusText}`);
  }
};
