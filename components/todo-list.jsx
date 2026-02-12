'use client'

import { useTodos } from '@/hooks/use-create-todo'
import React from 'react'
import { Card } from './ui/card'
import { Loader2 } from 'lucide-react'
import { useTodoStore } from '@/store/todo-store'
import TodoItem from "./todo-item"

const TodoList = () => {

  const {data: todos, isLoading, error} = useTodos()

  const filteredTodos = useTodoStore((state) => state.filteredTodos())

  if(isLoading){
    return (
      <Card>
        <Loader2 className='w-8 h-8 animate-spin mx-auto mb-4'/>
        <p>Loading todos...</p>
      </Card>
    )
  }

  if(error) {
    return (
      <Card>
        <p>Error loading todos: {error.message} </p>
      </Card>
    )
  }

  if(filteredTodos.length === 0){
    return(
      <Card>
        <p className='text-muted-foreground'>
          {todos.length === 0 ? "No todos yet." : "No todos matching"}
        </p>
      </Card>
    )
  }

  return (
    <div className='space-y-3'>
      {
        filteredTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo}/>
        ))
      }
      </div>
  )
}

export default TodoList