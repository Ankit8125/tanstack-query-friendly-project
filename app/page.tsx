import Image from "next/image";
import connectDB from "@/lib/db"
import TodoForm from "@/components/todo-form"
import TodoList from "@/components/todo-list"
import TodoFilter from "@/components/todo-filter"

export default async function Home() {

  await connectDB()

  
  return (
    <div>
      <main>
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </main>
    </div>
  );
}
