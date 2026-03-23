import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getMatches, getUserBets } from '../lib/database'
import MatchCard from '../components/MatchCard'
import GroupFilter from '../components/GroupFilter'
import MatchCalendar from '../components/MatchCalendar'
import RoundTabs from '../components/RoundTabs'
import Pagination from '../components/Pagination'
import type { Match, Bet } from '../types'

const PAGE_SIZE = 6

type FilterMode = 'group' | 'calendar' | 'round'

export default function Home() {
  const { user } = useAuth()
  const [matches, setMatches]   = useState<Match[]>([])
  const [bets, setBets]         = useState<Bet[]>([])
  const [loading, setLoading]   = useState(true)

  const [filterMode, setFilterMode]       = useState<FilterMode>('round')
  const [selectedDate, setSelectedDate]   = useState<string | null>(null)
  const [selectedRound, setSelectedRound] = useState<number>(1)
  const [selectedGroup, setSelectedGroup] = useState<string>('todos')
  const [page, setPage]                   = useState(1)

  useEffect(() => {
    if (!user) return
    Promise.all([getMatches(), getUserBets(user.id)])
      .then(([m, b]) => {
        setMatches(m)
        setBets(b)
        // Seleciona automaticamente o primeiro dia com jogos
        if (m.length > 0) {
          const firstDate = new Date(m[0].match_date)
            .toLocaleDateString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              year: 'numeric', month: '2-digit', day: '2-digit'
            })
          const [day, month, year] = firstDate.split('/')
          setSelectedDate(`${year}-${month}-${day}`)
        }
      })
      .finally(() => setLoading(false))
  }, [user])

  function handleDateChange(date: string) {
    setSelectedDate(date)
    setPage(1)
  }
  function handleRoundChange(round: number) {
    setSelectedRound(round)
    setPage(1)
  }
  function handleGroupChange(group: string) {
    setSelectedGroup(group)
    setPage(1)
  }
  function handleModeChange(mode: FilterMode) {
    setFilterMode(mode)
    setPage(1)
  }

  // Mapa rápido de palpites
  const betsMap = useMemo(() => {
    const map: Record<string, Bet> = {}
    bets.forEach(bet => { map[bet.match_id] = bet })
    return map
  }, [bets])

  // Grupos únicos
  const groups = useMemo(() =>
    [...new Set(matches.map(m => m.group_stage))], [matches])

  // Rodadas únicas
  const rounds = useMemo(() =>
    [...new Set(matches.map(m => m.round))].sort(), [matches])

  // Progresso de palpites por data
  const betCountByDate = useMemo(() => {
    const result: Record<string, { done: number; total: number }> = {}
    matches.forEach(match => {
      const iso = new Date(match.match_date).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric', month: '2-digit', day: '2-digit'
      })
      const [day, month, year] = iso.split('/')
      const key = `${year}-${month}-${day}`
      if (!result[key]) result[key] = { done: 0, total: 0 }
      result[key].total++
      if (betsMap[match.id]) result[key].done++
    })
    return result
  }, [matches, betsMap])

  // Progresso de palpites por rodada
  const betCountByRound = useMemo(() => {
    const result: Record<number, { done: number; total: number }> = {}
    rounds.forEach(round => {
      const roundMatches = matches.filter(m => m.round === round)
      result[round] = {
        total: roundMatches.length,
        done:  roundMatches.filter(m => betsMap[m.id]).length,
      }
    })
    return result
  }, [rounds, matches, betsMap])

  // Filtra partidas pelo modo ativo
  const filteredMatches = useMemo(() => {
    if (filterMode === 'calendar') {
      if (!selectedDate) return []
      return matches.filter(m => {
        const matchIso = new Date(m.match_date).toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric', month: '2-digit', day: '2-digit'
        })
        const [day, month, year] = matchIso.split('/')
        return `${year}-${month}-${day}` === selectedDate
      })
    }
    if (filterMode === 'round') {
      return matches.filter(m => m.round === selectedRound)
    }
    if (selectedGroup === 'todos') return matches
    return matches.filter(m => m.group_stage === selectedGroup)
  }, [matches, filterMode, selectedDate, selectedRound, selectedGroup])

  // Paginação
  const totalPages  = Math.ceil(filteredMatches.length / PAGE_SIZE)
  const pageMatches = filteredMatches.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  // Progresso geral
  const totalBets    = bets.length
  const totalMatches = matches.length

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
      <h1 className="text-3xl font-bold mb-1 text-shadow-amber-600 text-yellow-400">Partidas</h1>

      {/* Cabeçalho */}
{/* Cabeçalho */}
<div className="mb-6">
  <div className="flex items-end justify-between mb-4">
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Partidas</h1>
      <p className="text-sm text-gray-400 mt-0.5">
        Copa do Mundo 2026
      </p>
    </div>
    {/* Mini stats */}
    <div className="flex items-center gap-3 text-right">
      <div>
        <p className="text-xs text-gray-400">palpites</p>
        <p className="text-sm font-semibold text-gray-700">
          {totalBets}
          <span className="text-gray-300 font-normal">/{totalMatches}</span>
        </p>
      </div>
      {/* Barra de progresso vertical */}
      <div className="w-1 h-8 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="bg-green-500 rounded-full transition-all duration-700"
          style={{
            height: `${totalMatches > 0
              ? (totalBets / totalMatches) * 100 : 0}%`
          }}
        />
      </div>
    </div>
  </div>
</div>

      {/* Abas de modo */}

       <span className='flex-center text-gray-300'>Filtrar as partidas por data, rodada ou grupo.</span> 

      <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
         
        <button
          onClick={() => handleModeChange('calendar')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            filterMode === 'calendar'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Data
        </button>
        <button
          onClick={() => handleModeChange('round')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            filterMode === 'round'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Rodada
        </button>
        <button
          onClick={() => handleModeChange('group')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            filterMode === 'group'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Grupo
        </button>
      </div>

      {/* Filtro ativo */}
      {filterMode === 'calendar' && (
        <MatchCalendar
          matches={matches}
          selectedDate={selectedDate}
          onChange={handleDateChange}
          betCountByDate={betCountByDate}
        />
      )}
      {filterMode === 'round' && (
        <RoundTabs
          rounds={rounds}
          selected={selectedRound}
          onChange={handleRoundChange}
          betCountByRound={betCountByRound}
        />
      )}
      {filterMode === 'group' && (
        <GroupFilter
          groups={groups}
          selected={selectedGroup}
          onChange={handleGroupChange}
        />
      )}

      {/* Data selecionada como título */}
      {filterMode === 'calendar' && selectedDate && (
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gray-100"/>
          <span className="text-xs font-semibold text-gray-400  tracking-wide
                           bg-gray-50 px-3 py-1 rounded-full ">
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
              weekday: 'long', day: '2-digit', month: 'long'
            })}
          </span>
          <div className="h-px flex-1 bg-gray-100"/>
        </div>
      )}

      {/* Lista de partidas */}
      <div className="space-y-3">
        {pageMatches.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            existingBet={betsMap[match.id]}
          />
        ))}
      </div>

      {/* Paginação */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={p => {
          setPage(p)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      {filteredMatches.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p>Nenhuma partida encontrada</p>
        </div>
      )}
    </div>
  )
}