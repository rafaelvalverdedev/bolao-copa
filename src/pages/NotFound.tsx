// Página 404 — quando o usuário digita uma rota que não existe
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">🤷</p>
        <h1 className="text-2xl font-bold mb-2">Página não encontrada</h1>
        <p className="text-gray-500 mb-6">Essa URL não existe no sistema</p>
        <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}