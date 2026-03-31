import { isSameDay } from "date-fns"
import { useState } from "react"
import { HabitContext, type Habit } from "./useHabits"

type HabitProviderProps = {
  children: React.ReactNode
}

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabits(curr =>
      [...curr, { id: crypto.randomUUID(), name, completions: [new Date()] }])
  }

  function deleteHabit(id: string) {
    setHabits(curr =>
      curr.filter(habit => habit.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
    setHabits(curr => (
      curr.map(h => {
        if (h.id !== id) return h

        const alreadyDone = h.completions.some(c => isSameDay(c, date))
        const completions = alreadyDone ? h.completions.filter(c => !isSameDay(c, date)) : [...h.completions, date]

        return { ...h, completions }
      })
    ))
  }

  return (
    <HabitContext.Provider value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext.Provider>
  )
}

