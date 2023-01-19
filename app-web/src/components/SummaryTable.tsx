import { generateDatesFromYearBenning } from '../utils/generate-dates-from-year-begenning'
import { HabitDay } from './HabitDay'

export function SummaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const summaryDays = generateDatesFromYearBenning()

  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountDaysOfToFill = minimumSummaryDatesSize - summaryDays.length

  return (
    <div className="w-full flex gap-3">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => {
          return (
            <div
              key={`${day}-${i}`}
              className="text-zinc-400 text-xl font-bold w-10 h-10 flex justify-center items-center"
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDays.map((date) => {
          return <HabitDay key={date.toISOString()} />
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
