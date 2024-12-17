import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        deletedAt: null, //this only gets the tasks that don't have a value in the deletedAt variable
      }
    }); // Fetch all tasks
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  //the function name "POST" is actually required here
  try {
    const { title, description } = await req.json();
    const newTask = await prisma.task.create({
      data: { title, description },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
