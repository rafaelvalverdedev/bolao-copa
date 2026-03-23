import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

// Define o formato do contexto — o que vamos disponibilizar
// para todos os componentes da aplicação
interface AuthContextType {
  user: User | null        // null = ninguém logado
  session: Session | null
  loading: boolean         // true enquanto verifica se tem sessão salva
  signUp: (email: string, password: string, name: string) => Promise<string | null>
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

// Cria o contexto com valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider: envolve a aplicação e disponibiliza os dados de auth
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ao carregar, verifica se já existe uma sessão salva no navegador
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Fica escutando mudanças de auth (login, logout, expiração)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Limpa o listener quando o componente é desmontado
    return () => subscription.unsubscribe()
  }, [])

  // Cadastro de novo usuário
  async function signUp(email: string, password: string, name: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }  // salva o nome nos metadados do usuário
      }
    })
    return error ? error.message : null  // retorna null se deu certo
  }

  // Login com email e senha
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? error.message : null
  }

  // Logout
  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook customizado — qualquer componente chama useAuth() para acessar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}