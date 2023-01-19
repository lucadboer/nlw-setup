import { HabitDay } from './HabitDay'

export function SummaryTable() {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

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
        <HabitDay />
      </div>
    </div>
  )
}
