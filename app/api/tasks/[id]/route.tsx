import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //creates prisma client instance here

// Handle fetching, updating, and deleting a single task by ID
export async function GET( //this function is for fetching a single task, and isn't used right now.
  req: Request,
  { params }: { params: Promise<{ id: string }> } //The params property is a Promise that resolves to an object containing { id: string }
) {
  try {
    const { id } = await params; //have to use await for the params because we are passing in a promise to see if they have the task with that id, and then the reponse is the id if they do have it.
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params promise
    const { title, description, completed } = await req.json(); // Parse the request body
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params promise

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await prisma.task.update({ //using .update here as a way to do soft delete since in this case we don't want to actually delete the data, just hide it from the users.
      where: { id },
      data: { deletedAt: new Date() }, 
    });

    return NextResponse.json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
