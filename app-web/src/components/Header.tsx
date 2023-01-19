import logo from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="Logo do NLW Setup" />
      <button className="flex items-center justify-center gap-3 h-[52px] px-6 text-white font-semibold border-2 border-violet-500 rounded-md animate-pulse transition hover:shadow-button hover:shadow-violet-900 hover:-translate-y-2">
        <Plus className="text-violet-500" size={20} weight="bold" />
        Novo Hábito
      </button>
    </header>
  )
}
