import { supabase } from '../../lib/supabase'

interface Props { children: React.ReactNode }

export function AppLayout({ children }: Props) {
  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-greytone-100 flex flex-col">
      <header className="bg-greytone-50 border-b border-greytone-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.28em] uppercase text-greytone-400 font-sans">Greytone Digital</span>
          <span className="text-greytone-300 font-sans">·</span>
          <span className="font-serif text-greytone-800 text-sm">Outreach OS</span>
        </div>
        <button onClick={handleSignOut}
          className="text-xs text-greytone-400 hover:text-greytone-700 font-sans tracking-wider uppercase transition-colors">
          Sign out
        </button>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
