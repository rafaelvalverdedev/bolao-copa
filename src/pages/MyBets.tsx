import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getMatches, getUserBets } from '../lib/database'
import MatchCard from '../components/MatchCard'
import type { Match, Bet } from '../types'

export default function MyBets() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [bets, setBets]       = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([getMatches(), getUserBets(user.id)])
      .then(([m, b]) => { setMatches(m); setBets(b) })
      .finally(() => setLoading(false))
  }, [user])

  // Mapa rápido de palpites
  const betsMap = useMemo(() => {
    const map: Record<string, Bet> = {}
    bets.forEach(bet => { map[bet.match_id] = bet })
    return map
  }, [bets])

  // Só as partidas que o usuário apostou
  const bettedMatches = useMemo(() =>
    matches.filter(m => betsMap[m.id]), [matches, betsMap])

  // Separa finalizadas das pendentes
  const finished = bettedMatches.filter(m =>  m.is_finished)
  const pending  = bettedMatches.filter(m => !m.is_finished)

  // Totais
  const totalPoints  = bets.reduce((sum, b) => sum + (b.points ?? 0), 0)
  const exactScores  = bets.filter(b => b.points === 10).length
  const correctResults = bets.filter(b => b.points === 5).length

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl h-40 shadow-sm"/>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">

      {/* Cabeçalho */}
      <div className="mb-6">

                <p className="text-gray-500 text-sm">
          Você palpitou em
          <span className="font-semibold text-green-600"> {bettedMatches.length} </span>
          de
          <span className="font-semibold"> {matches.length} </span>
          partidas
        </p>



        {/* Barra de progresso */}
        <div className="mt-2 bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-700"
            style={{
              width: `${matches.length > 0
                ? (bettedMatches.length / matches.length) * 100
                : 0}%`
            }}
          />
        </div>
      </div>

      {/* Cards de estatísticas */}
      {bets.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100
                          shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
            <p className="text-xs text-gray-400 mt-0.5">pontos</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100
                          shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">{exactScores}</p>
            <p className="text-xs text-gray-400 mt-0.5">🏆 exatos</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100
                          shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">{correctResults}</p>
            <p className="text-xs text-gray-400 mt-0.5">✅ resultados</p>
          </div>
        </div>
      )}

      {bettedMatches.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎯</p>
          <p className="mb-2">Você ainda não fez nenhum palpite</p>
          <a href="/" className="text-green-600 text-sm hover:underline">
            Ir para as partidas →
          </a>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Partidas finalizadas */}
          {finished.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gray-100"/>
                <span className="text-xs font-semibold text-gray-400
                                 uppercase tracking-wide bg-gray-50
                                 px-3 py-1 rounded-full">
                  Finalizadas · {finished.length}
                </span>
                <div className="h-px flex-1 bg-gray-100"/>
              </div>
              <div className="space-y-3">
                {finished.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    existingBet={betsMap[match.id]}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Partidas aguardando resultado */}
          {pending.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gray-100"/>
                <span className="text-xs font-semibold text-gray-400
                                 uppercase tracking-wide bg-gray-50
                                 px-3 py-1 rounded-full">
                  Aguardando resultado · {pending.length}
                </span>
                <div className="h-px flex-1 bg-gray-100"/>
              </div>
              <div className="space-y-3">
                {pending.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    existingBet={betsMap[match.id]}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}