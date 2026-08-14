interface Props { children: React.ReactNode }

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-greytone-100 flex flex-col">
      <header className="bg-greytone-50 border-b border-greytone-200 px-6 py-4 flex items-center flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.28em] uppercase text-greytone-400 font-sans">Greytone Digital</span>
          <span className="text-greytone-300 font-sans">·</span>
          <span className="font-serif text-greytone-800 text-sm">Outreach OS</span>
        </div>
      </header>
      <div className="bg-greytone-50 border-b border-greytone-200 px-6 py-5">
        <p className="font-serif text-greytone-800 text-lg">Personalized outreach, ready in a few clicks.</p>
        <p className="font-sans text-sm text-greytone-500 mt-2 leading-relaxed">
          Choose the outreach type, enter what you know about the recipient, and Outreach OS creates a polished, personalized email. Review it, make any edits, and send.
        </p>
      </div>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
