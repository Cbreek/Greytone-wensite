import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-greytone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.28em] uppercase text-greytone-500 mb-2 font-sans">
            Greytone Digital
          </div>
          <h1 className="font-serif text-2xl text-greytone-900 mb-1">Outreach OS</h1>
          <div className="w-8 h-px bg-greytone-300 mx-auto"></div>
        </div>
        <div className="bg-greytone-50 rounded-lg border border-greytone-200 p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wider uppercase text-greytone-500 mb-2 font-sans">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-greytone-200 rounded text-greytone-900 text-sm font-sans focus:outline-none focus:border-greytone-400 transition-colors"
                placeholder="you@greytonedigital.com" />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-greytone-500 mb-2 font-sans">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-greytone-200 rounded text-greytone-900 text-sm font-sans focus:outline-none focus:border-greytone-400 transition-colors"
                placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-600 font-sans">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 border border-greytone-400 rounded text-xs tracking-[0.2em] uppercase text-greytone-700 font-sans hover:bg-greytone-100 transition-colors disabled:opacity-50">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-greytone-400 mt-6 font-sans">Private tool — Greytone Digital</p>
      </div>
    </div>
  )
}
