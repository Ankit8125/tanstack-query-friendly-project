import Image from "next/image";
import connectDB from "@/lib/db"
import TodoForm from "@/components/todo-form"

export default async function Home() {

  await connectDB()

  
  return (
    <div>
      <main>
        <TodoForm />
      </main>
    </div>
  );
}
