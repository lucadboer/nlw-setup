import * as Checkbox from '@radix-ui/react-checkbox'

import { Check } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { api } from '../libs/axios'

const newHabitFormSchema = z.object({
  habit: z.string().min(1),
})

type NewHabitInputs = z.infer<typeof newHabitFormSchema>

export function NewHabitForm() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewHabitInputs>({
    resolver: zodResolver(newHabitFormSchema),
  })

  const avaliableWeekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ]

  async function handleCreateNewHabit(data: NewHabitInputs) {
    if (data.habit && weekDays.length !== 0) {
      try {
        await api.post('habits', {
          title: data.habit,
          weekDays,
        })

        reset()
        setWeekDays([])
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('Coloque pelo menos um dia na semana')
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const newWeekDaysToRemoved = weekDays.filter((day) => day !== weekDay)
      setWeekDays(newWeekDaysToRemoved)
    } else {
      const newWeekDaysToAdded = [...weekDays, weekDay]
      setWeekDays(newWeekDaysToAdded)
    }
  }

  return (
    <form
      className="flex flex-col mt-6 text-white"
      onSubmit={handleSubmit(handleCreateNewHabit)}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="habit" className="font-semibold">
          Qual o seu comprometimento?
        </label>
        <input
          type="text"
          id="habit"
          placeholder="Exercícios, dormir bem, etc..."
          className="bg-zinc-800 p-4 rounded-lg placeholder:text-zinc-400 outline-none focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          autoFocus
          {...register('habit')}
        />

        {errors.habit && (
          <>
            <span className="-mt-2 text-sm font-semibold text-red-600">
              Digite o hábito que deseja ter
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <label htmlFor="Days" className="font-semibold">
          Qual a recorrência?
        </label>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {avaliableWeekDays.map((day, index) => {
          return (
            <Checkbox.Root
              key={day}
              className="flex items-center gap-3 group outline-none"
              onCheckedChange={() => handleToggleWeekDay(index)}
              checked={weekDays.includes(index)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-800 group-data-[state=checked]:bg-green-500 transition-colors duration-300 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                <Checkbox.Indicator>
                  <Check size={20} />
                </Checkbox.Indicator>
              </div>

              <label>{day}</label>
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 mt-6 bg-green-600 h-[3.25rem] rounded-lg font-semibold transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
