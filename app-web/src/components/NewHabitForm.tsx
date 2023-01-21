import { Check } from 'phosphor-react'
import { useForm } from 'react-hook-form'

export function NewHabitForm() {
  const { register, handleSubmit } = useForm()

  return (
    <form className="flex flex-col mt-6 text-white">
      <div className="flex flex-col gap-3">
        <label htmlFor="habit" className="font-semibold">
          Qual o seu comprometimento?
        </label>
        <input
          type="text"
          id="habit"
          placeholder="Exercícios, dormir bem, etc..."
          className="bg-zinc-800 p-4 rounded-lg placeholder:text-zinc-400 outline-none"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <label htmlFor="Days" className="font-semibold">
          Qual a recorrência?
        </label>
      </div>

      <button className="flex items-center justify-center gap-2 bg-green-600 h-[3.25rem] rounded-lg font-semibold transition hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
