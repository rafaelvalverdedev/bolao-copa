import { createClient } from '@supabase/supabase-js'

// Lê as variáveis do arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cria e exporta o cliente — é ele que usamos em toda a aplicação
// para falar com o banco de dados e autenticação
export const supabase = createClient(supabaseUrl, supabaseAnonKey)