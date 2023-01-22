import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../libs/axios'

interface HabitListProps {
  date: Date
}

interface HabitsInfo {
  possibleHabits: {
    id: string
    title: string
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitList({ date }: HabitListProps) {
  const [habits, setHabits] = useState<HabitsInfo>()

  useEffect(() => {
    getHabitsDay()
  }, [])

  async function getHabitsDay() {
    const habitsInfo = await api.get('day', {
      params: {
        date: date.toISOString(),
      },
    })
    console.log(habitsInfo)

    setHabits(habitsInfo.data)
  }

  function handleToggleChecked(habitId: string) {
    api.patch(`habits/${habitId}/toggle`)

    const isHabitCompleted = habits?.completedHabits.includes(habitId)

    if (isHabitCompleted) {
      const habitToRemoved = habits?.completedHabits.filter(
        (id) => id !== habitId,
      )

      setHabits({
        possibleHabits: habits?.possibleHabits!,
        completedHabits: habitToRemoved!,
      })
    } else {
      const habitToAdded = [...habits!.completedHabits, habitId]

      setHabits({
        possibleHabits: habits?.possibleHabits!,
        completedHabits: habitToAdded!,
      })
    }
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habits?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            className="flex items-center gap-3 group"
            checked={habits.completedHabits.includes(habit.id)}
            onCheckedChange={() => handleToggleChecked(habit.id)}
            disabled={isDateInPast}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-800 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} />
              </Checkbox.Indicator>
            </div>

            <span className="text-xl font-semibold group-data-[state=checked]:line-through group-data-[state=checked]:opacity-60">
              {habit.title}
            </span>
          </Checkbox.Root>
        )
      })}

      {habits?.possibleHabits.length === 0 && (
        <span className="text-lg font-semibold opacity-60">
          Nenhum hábito cadastrado
        </span>
      )}
    </div>
  )
}
