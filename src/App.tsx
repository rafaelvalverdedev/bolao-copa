import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Ranking from './pages/Ranking'
import MyBets from './pages/MyBets'
import NotFound from './pages/NotFound'

import LoadingScreen from './components/LoadingScreen'

// Componente que protege rotas privadas
// Se não há usuário logado, redireciona para /login
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />  // ← troca aqui

  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}

// Layout compartilhado pelas páginas privadas
function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-6">{children}</main>
    </div>
  )
}

export default function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Se já está logado e tenta acessar /login, vai para home */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path="/" element={
          <PrivateRoute>
            <PrivateLayout><Home /></PrivateLayout>
          </PrivateRoute>
        }/>

        <Route path="/meus-palpites" element={
          <PrivateRoute>
            <PrivateLayout><MyBets /></PrivateLayout>
          </PrivateRoute>
        }/>

        <Route path="/ranking" element={
          <PrivateRoute>
            <PrivateLayout><Ranking /></PrivateLayout>
          </PrivateRoute>
        }/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}