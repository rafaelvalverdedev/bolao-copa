import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [mode, setMode]       = useState<'login' | 'signup'>('login')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    let errorMsg: string | null = null

    if (mode === 'login') {
      errorMsg = await signIn(email, password)
    } else {
      if (name.trim().length < 2) {
        setError('Digite seu nome completo')
        setLoading(false)
        return
      }
      errorMsg = await signUp(email, password, name)
    }

    setLoading(false)

    if (errorMsg) {
      if (errorMsg.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos')
      } else if (errorMsg.includes('User already registered')) {
        setError('Este email já está cadastrado')
      } else if (errorMsg.includes('Password should be at least')) {
        setError('A senha deve ter pelo menos 6 caracteres')
      } else {
        setError(errorMsg)
      }
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                    bg-gradient-to-br from-slate-200 to-slate-500 px-4 py-8">

      {/* Card central */}
      <div className="bg-white rounded-3xl shadow-2xl w-90 max-w-md overflow-hidden">

        {/* Banner superior */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-800 px-8 py-8 text-center">
          <img src="./favicon.svg" alt="Ícone" className="mx-auto w-16 h-16" />
          <h1 className="text-2xl font-bold text-white">Bolão Copa 2026</h1>
          <p className="text-green-100 text-sm mt-1">
            Faça seus palpites e dispute com amigos
          </p>
        </div>

        {/* Formulário */}
        <div className="px-8 py-6">

          {/* Abas */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null) }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             focus:outline-none focus:ring-2 focus:ring-green-500
                             focus:border-transparent transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-green-500
                           focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="mínimo 6 caracteres"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:ring-2 focus:ring-green-500
                           focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600
                              text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl font-semibold
                         hover:bg-green-700 active:scale-95 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading
                ? 'Aguarde...'
                : mode === 'login' ? 'Entrar' : 'Criar conta'
              }
            </button>
          </form>
        </div>
      </div>

      {/* Rodapé */}
      <p className="text-lime-200 text-xs mt-6 text-center">
        por <a href="https://rafaelvalverde.dev" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:text-green-300">
          RafaelValverde.dev
        </a>
      </p>
    </div>
  )
}