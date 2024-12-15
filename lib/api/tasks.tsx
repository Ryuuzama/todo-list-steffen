import { Task } from "lib/types"

export const fetchTasks = async () => {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  return response.json();
};

export const addTask = async (title: string, description: string | null) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error(`Error adding task: ${response.statusText}`);
  }
  return response.json();
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
