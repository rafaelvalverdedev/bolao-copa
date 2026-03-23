import { useState } from 'react'
import { saveBet } from '../lib/database'
import { useAuth } from '../contexts/AuthContext'
import { teamFlagUrl } from '../lib/flags'
import type { Match, Bet } from '../types'

interface MatchCardProps {
  match: Match
  existingBet?: Bet
}

export default function MatchCard({ match, existingBet }: MatchCardProps) {
  const { user } = useAuth()

  const [homeScore, setHomeScore] = useState<string>(
    existingBet?.home_score?.toString() ?? ''
  )
  const [awayScore, setAwayScore] = useState<string>(
    existingBet?.away_score?.toString() ?? ''
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [error, setError]   = useState<string | null>(null)

  const matchDate = new Date(match.match_date)
  const dateLabel = matchDate.toLocaleString('pt-BR', {
    day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  })

  const isLocked = match.is_finished || new Date() > matchDate

  // Calcula status do palpite para mostrar badge
  const betStatus = (() => {
    if (!existingBet) return null
    if (!match.is_finished) return 'pending'
    if (existingBet.points === 10) return 'exact'
    if (existingBet.points === 5)  return 'correct'
    return 'wrong'
  })()

  async function handleSave() {
    if (!user) return
    if (homeScore === '' || awayScore === '') {
      setError('Preencha os dois placares')
      return
    }
    const home = parseInt(homeScore)
    const away = parseInt(awayScore)
    if (home < 0 || away < 0) {
      setError('Placar não pode ser negativo')
      return
    }
    setSaving(true)
    setError(null)
    try {
      await saveBet(user.id, match.id, home, away)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(`Erro ao salvar: ${message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border transition-all ${
      isLocked
        ? 'border-gray-100'
        : 'border-gray-100 hover:border-green-200 hover:shadow-md'
    }`}>

      {/* Cabeçalho do card */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {match.group_stage}
        </span>
        <div className="flex items-center gap-2">
          {/* Badge de status do palpite */}
          {betStatus === 'exact'   && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Exato</span>}
          {betStatus === 'correct' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Resultado</span>}
          {betStatus === 'wrong'   && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">Errou</span>}
          {betStatus === 'pending' && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Aguardando</span>}
          <span className="text-xs text-gray-400">{dateLabel}</span>
        </div>
      </div>

      {/* Área dos times e placar */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between gap-2">

          {/* Time da casa */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <img
              src={teamFlagUrl(match.home_team)}
              alt={match.home_team}
              className="w-12 h-8 object-cover rounded shadow-sm"
            />
            <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
              {match.home_team}
            </p>
          </div>

          {/* Placares */}
          <div className="flex flex-col items-center gap-2">
            {/* Inputs de palpite */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <input
                value={homeScore}
  type="text"
  inputMode="numeric"
  maxLength={1}
  onClick={(e) => {
    const input = e.target as HTMLInputElement
    setTimeout(() => {
      const len = input.value.length
      input.setSelectionRange(len, len)
    }, 0)
  }}
  onChange={(e) => {
    const value = e.target.value

    if (/^[0-9]?$/.test(value)) {
      setHomeScore(value)
    }
  }}
  disabled={isLocked}
  placeholder="–"
  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold
             border-2 rounded-xl focus:outline-none focus:border-green-500
             transition-colors disabled:bg-gray-50 disabled:text-gray-400
             disabled:cursor-not-allowed border-gray-200"
              />
              <span className="text-lg text-gray-300 font-light">×</span>
              <input
                value={awayScore}
  type="text"
  inputMode="numeric"
  maxLength={1}
  onClick={(e) => {
    const input = e.target as HTMLInputElement
    setTimeout(() => {
      const len = input.value.length
      input.setSelectionRange(len, len)
    }, 0)
  }}

  onChange={(e) => {
    const value = e.target.value

    if (/^[0-9]?$/.test(value)) {
      setAwayScore(value)
    }
  }}
  disabled={isLocked}
  placeholder="–"
  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold
             border-2 rounded-xl focus:outline-none focus:border-green-500
             transition-colors disabled:bg-gray-50 disabled:text-gray-400
             disabled:cursor-not-allowed border-gray-200"
              />
            </div>

            {/* Resultado real quando finalizada */}
            {match.is_finished && match.home_score !== null && (
              <div className="text-center">
                <p className="text-xs text-gray-400">Resultado</p>
                <p className="text-sm font-bold text-gray-600">
                  {match.home_score} × {match.away_score}
                </p>
              </div>
            )}
          </div>

          {/* Time visitante */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <img
              src={teamFlagUrl(match.away_team)}
              alt={match.away_team}
              className="w-12 h-8 object-cover rounded shadow-sm"
            />
            <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">
              {match.away_team}
            </p>
          </div>
        </div>

        {/* Rodapé do card */}
        {!isLocked && (
          <div className="mt-4">
            {error && (
              <p className="text-xs text-red-500 text-center mb-2">{error}</p>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                          active:scale-95 disabled:opacity-50 ${
                saved
                  ? 'bg-green-100 text-green-300'
                  : 'bg-mist-300 text-mist-700 hover:bg-green-700 hover:text-white drop-shadow-green-900'
              }`}
            >
              {saving ? 'Salvando...' : saved ? '✓ Salvo!' : 'Salvar palpite'}
            </button>
          </div>
        )}

        {isLocked && !match.is_finished && (
          <p className="text-center text-xs text-orange-400 mt-3">
            Partida iniciada — palpites encerrados
          </p>
        )}
      </div>
    </div>
  )
}