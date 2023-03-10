import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { ProgressBar } from './ProgressBar'
import dayjs from 'dayjs'
import { HabitList } from './HabitList'
import { useState } from 'react'

interface HabitDayProps {
  date: Date
  amount?: number
  defaulCompleted?: number
}

export function HabitDay({
  amount = 0,
  defaulCompleted = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaulCompleted)

  const completedPorcentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeekName = dayjs(date).format('dddd')

  function handleCompletedHabit(amount: number) {
    setCompleted(amount)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-zinc-900 border border-zinc-800': completedPorcentage === 0,
            'bg-violet-900 border-violet-800':
              completedPorcentage > 0 && completedPorcentage < 20,

            'bg-violet-800 border-violet-700':
              completedPorcentage >= 20 && completedPorcentage < 40,

            'bg-violet-700 border-violet-600':
              completedPorcentage >= 40 && completedPorcentage < 60,

            'bg-violet-600 border-violet-500':
              completedPorcentage >= 60 && completedPorcentage < 80,
            'bg-violet-500 border-violet-400': completedPorcentage >= 80,
          },
        )}
      ></Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[24rem] flex flex-col bg-zinc-900 text-white p-6 rounded-lg shadow-lg">
          <span className="text-zinc-400">{dayOfWeekName}</span>
          <strong className="mt-1 font-bold text-3xl">{dayAndMonth}</strong>
          <ProgressBar progress={completedPorcentage} />

          <HabitList date={date} onCompletedHabit={handleCompletedHabit} />

          <Popover.Arrow width={15} height={10} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
