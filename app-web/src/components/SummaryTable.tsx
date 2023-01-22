import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../libs/axios'
import { generateDatesFromYearBenning } from '../utils/generate-dates-from-year-begenning'
import { HabitDay } from './HabitDay'

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDays = generateDatesFromYearBenning()

  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountDaysOfToFill = minimumSummaryDatesSize - summaryDays.length

  useEffect(() => {
    getSummaryHabits()
  }, [])

  async function getSummaryHabits() {
    const newSummary = await api.get('/summary')

    setSummary(newSummary.data)
  }

  return (
    <div className="w-full flex gap-3">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((date, i) => {
          return (
            <div
              key={`${date}-${i}`}
              className="text-zinc-400 text-xl font-bold w-10 h-10 flex justify-center items-center"
            >
              {date}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDays.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amount={dayInSummary?.amount}
                defaulCompleted={dayInSummary?.completed}
              />
            )
          })}

        {amountDaysOfToFill > 0 &&
          Array.from({ length: amountDaysOfToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-md opacity-40 cursor-not-allowed"
              />
            )
          })}
      </div>
    </div>
  )
}
