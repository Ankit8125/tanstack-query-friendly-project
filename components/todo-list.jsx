'use client'

import { useTodos } from '@/hooks/use-create-todo'
import React, { useEffect, useMemo } from 'react'
import { Card } from './ui/card'
import { Loader2 } from 'lucide-react'
import { useTodoStore } from '@/store/todo-store'
import TodoItem from "./todo-item"

const TodoList = () => {

  const {data, isLoading, error} = useTodos()

  const setTodos = useTodoStore(state => state.setTodos)
  const todos =  useTodoStore(state => state.todos)

  const filter = useTodoStore(state => state.filter)

  const filteredTodos = useMemo(() => {
    switch(filter) {
        case "active":
          return todos.filter((todo) => !todo.completed)
        case "completed":
          return todos.filter((todo) => todo.completed)
        default:
          return todos
      }
  }, [todos, filter])

  useEffect(() => {
    if(data) {
      setTodos(data)
    }
  }, [data, setTodos])

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