'use server'

import { revalidatePath } from "next/cache"
import connectDB from "@/lib/db"
import Todo from "@/model/todo"
import { createTodoSchema } from "../validations/todo"

export async function createTodo(data){
  try {
    const validatedData = createTodoSchema.parse(data)
    await connectDB()
    
    const todo = await Todo.create(validatedData)
    revalidatePath("/")

    return{
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }
  } catch (error) {
    console.log("error creating todo", error);
    return {
      success: false,
      error: error.message || "Failed to create todo"
    }
  }
}

export async function getTodos() {
  try {
    await connectDB()

    const todos = await Todo.find({}).sort({createdAt: -1})

    return{
      success: true,
      data: JSON.parse(JSON.stringify(todos))
    }
  } catch (error) {
    console.log("eror fetching todos");
    return{
      success: false,
      data: "Failed to fetch todos"
    }
  }
}
