'use client'
import React from 'react'
import { useTodoStore } from "../store/todo-store";
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"

const TodoFilter = () => {

  const {filter, setFilter, completedCount, activeCount} = useTodoStore()

  const filters = [
    { key: "all", label: "All", count: activeCount() + completedCount()},
    { key: "active", label: "Active", count: activeCount() },
    { key: "completed", label: "Completed", count: completedCount() },
  ]

  return (
    <div>
      <Card>
        <div className='flex gap-2'>
          {
            filters.map(({key, label, count}) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
                className='relative'
              >
                {label}
                {count > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs">
                    {count}
                  </span>
                )}
              </Button>
            ))
          }
        </div>

        <div className='text-sm text-muted-foreground'>
          {activeCount()} active, {completedCount()} completed
        </div>
      </Card>
    </div>
  )
}

export default TodoFilter