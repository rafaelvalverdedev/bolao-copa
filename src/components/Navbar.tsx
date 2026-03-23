import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  // Nome exibido — usa o nome do cadastro ou o email como fallback
  const displayName = user?.user_metadata?.name ?? user?.email ?? ''
  // Pega só o primeiro nome para não ficar longo na navbar
  const firstName = displayName.split(' ')[0]

  const links = [
    { to: '/',              label: 'Partidas',      },
    { to: '/meus-palpites', label: 'Meus Palpites', },
    { to: '/ranking',       label: 'Ranking',       },
  ]

  function isActive(path: string) {
    return location.pathname === path
  }

  return (
    <nav className="bg-gradient-to-r from-green-600 to-emerald-800 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-gray-800 text-lg">
            <img src="./favicon.svg" alt="Ícone" className="mx-auto w-8 h-8" />
            <span className="sm:block text-white">Bolão 2026</span>
          </Link>

          {/* Links — visíveis só no desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-300 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Usuário + botão sair — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Avatar com inicial */}
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center
                              text-green-700 font-bold text-sm">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-100">{firstName}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-100 hover:text-red-500 transition-colors px-2 py-1 cursor-pointer"
            >
              Sair
            </button>
          </div>

          {/* Botão hamburguer — só no mobile */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-gray-100 hover:bg-gray-50"
            aria-label="Menu"
          >
            {/* Ícone hamburguer / X */}
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}/>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}/>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}/>
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile — expande ao clicar no hamburguer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2">

          {/* Info do usuário */}
          <div className="flex items-center gap-3 py-3 border-b border-gray-100 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center
                            text-green-700 font-bold">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{displayName}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Links mobile */}
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                          transition-all mb-1 ${
                isActive(link.to)
                  ? 'bg-green-50 text-green-700 shadow-sm text-bold'
                  : 'text-gray-300 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Botão sair mobile */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                       text-red-500 hover:bg-red-50 transition-all w-full mt-1"
          >
            Sair da conta
          </button>
        </div>
      )}
    </nav>
  )
}