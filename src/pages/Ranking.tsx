import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getRanking } from '../lib/database'
import type { RankingEntry } from '../types'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Ranking() {
  const { user } = useAuth()
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRanking().then(setRanking).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="animate-pulse space-y-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white rounded-xl h-14 border border-gray-100"/>
          ))}
        </div>
      </div>
    )
  }

  const myPosition = ranking.find(r => r.user_id === user?.id)

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">

      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Ranking</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {ranking.length} participantes
        </p>
      </div>

      {/* Sua posição */}
      {myPosition && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">sua posição</p>
            <p className="text-2xl font-semibold text-gray-800">
              {myPosition.position}º
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">seus pontos</p>
            <p className="text-2xl font-semibold text-green-600">
              {myPosition.total_points}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">exatos</p>
            <p className="text-2xl font-semibold text-gray-800">
              {myPosition.exact_scores}
            </p>
          </div>
        </div>
      )}

      {ranking.length === 0 ? (
        <div className="text-center py-16 text-gray-300">
          <p className="text-4xl mb-3">🏆</p>
          <p className="text-sm">Nenhuma partida finalizada ainda</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {ranking.map((entry, i) => {
            const isMe  = entry.user_id === user?.id
            const isPodium = i < 3

            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-3 px-4 py-3 border-b
                            border-gray-50 last:border-0 transition-colors ${
                  isMe ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                {/* Posição */}
                <div className="w-8 text-center">
                  {isPodium
                    ? <span className="text-base">{MEDALS[i]}</span>
                    : <span className="text-xs text-gray-300 font-medium">
                        {entry.position}º
                      </span>
                  }
                </div>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                 text-xs font-semibold ${
                  isMe
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {entry.user_name.charAt(0).toUpperCase()}
                </div>

                {/* Nome */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    isMe ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {entry.user_name}
                    {isMe && (
                      <span className="ml-2 text-xs text-green-400 font-normal">
                        você
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-300">
                    🏆 {entry.exact_scores} exatos ·
                    ✅ {entry.correct_results} resultados
                  </p>
                </div>

                {/* Pontos */}
                <p className={`text-sm font-semibold ${
                  isMe ? 'text-green-600' : 'text-gray-700'
                }`}>
                  {entry.total_points}
                  <span className="text-xs font-normal text-gray-300 ml-1">
                    pts
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}