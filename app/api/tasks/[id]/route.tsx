import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle fetching, updating, and deleting a single task by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description, completed } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: { title, description, completed },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      if (!id) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
      }
  
      const deletedTask = await prisma.task.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
