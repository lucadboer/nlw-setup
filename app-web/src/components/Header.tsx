import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'phosphor-react'

import logo from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm'

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logo} alt="Logo do NLW Setup" />
      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="flex items-center justify-center gap-3 h-[52px] px-6 text-white font-semibold border-2 border-violet-500 rounded-md transition hover:shadow-button hover:shadow-violet-900 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
        >
          <Plus className="text-violet-500" size={20} weight="bold" />
          Novo Hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen fixed inset-0 bg-black/80" />

          <Dialog.Content className="absolute w-full max-w-md text-white rounded-lg bg-zinc-900 p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute top-6 right-6 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
              <X className="text-zinc-400 hover:text-red-400" size={24} />
            </Dialog.Close>
            <Dialog.Title className="font-extrabold text-3xl mt-2">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}
