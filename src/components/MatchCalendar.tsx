import { useMemo } from 'react'
import type { Match } from '../types'

interface MatchCalendarProps {
  matches: Match[]
  selectedDate: string | null       // formato 'YYYY-MM-DD'
  onChange: (date: string) => void
  betCountByDate: Record<string, { done: number; total: number }>
}

export default function MatchCalendar({
  matches, selectedDate, onChange, betCountByDate
}: MatchCalendarProps) {

  // Extrai todas as datas únicas com jogos
  const datesWithMatches = useMemo(() => {
    const dates = matches.map(m =>
      new Date(m.match_date).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric', month: '2-digit', day: '2-digit'
      })
    )
    // Remove duplicatas e ordena
    return [...new Set(dates)].sort((a, b) => {
      const [da, ma, ya] = a.split('/').map(Number)
      const [db, mb, yb] = b.split('/').map(Number)
      return new Date(ya, ma-1, da).getTime() - new Date(yb, mb-1, db).getTime()
    })
  }, [matches])

  // Agrupa as datas por mês para exibir o calendário
  const datesByMonth = useMemo(() => {
    const months: Record<string, string[]> = {}
    datesWithMatches.forEach(dateStr => {
      const [day, month, year] = dateStr.split('/').map(Number)
      const date = new Date(year, month - 1, day)
      const monthKey = date.toLocaleDateString('pt-BR', {
        month: 'long', year: 'numeric'
      })
      if (!months[monthKey]) months[monthKey] = []
      months[monthKey].push(dateStr)
    })
    return months
  }, [datesWithMatches])

  // Converte 'DD/MM/YYYY' para 'YYYY-MM-DD' (formato da chave do betCountByDate)
  function toIsoDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
      {Object.entries(datesByMonth).map(([monthLabel, dates]) => (
        <div key={monthLabel} className="mb-4 last:mb-0">

          {/* Cabeçalho do mês */}
          <p className="text-xs font-semibold text-gray-400 tracking-wide mb-3">
            {monthLabel}
          </p>

          {/* Grid de dias */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {dates.map(dateStr => {
              const iso       = toIsoDate(dateStr)
              const isSelected = selectedDate === iso
              const counts    = betCountByDate[iso] ?? { done: 0, total: 0 }
              const allDone   = counts.total > 0 && counts.done === counts.total
              const hasBets   = counts.done > 0

              // Extrai só o dia e o nome curto do dia da semana
              const [day, month] = dateStr.split('/').map(Number)
              const dateObj = new Date(2026, month - 1, day)
              const dayNum  = dateObj.getDate()
              const weekDay = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' })
                .replace('.', '')

              return (
                <button
                  key={dateStr}
                  onClick={() => onChange(iso)}
                  className={`relative flex flex-col items-center py-2.5 px-1 rounded-xl
                              transition-all border-2 ${
                    isSelected
                      ? 'bg-green-600 border-green-600 text-white shadow-md scale-105'
                      : allDone
                      ? 'bg-green-50 border-green-200 text-green-700 hover:border-green-400'
                      : hasBets
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:border-amber-400'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  {/* Badge de completo */}
                  {allDone && !isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500
                                     text-white text-xs rounded-full flex items-center
                                     justify-center leading-none">
                      ✓
                    </span>
                  )}

                  {/* Dia da semana */}
                  <span className={`text-xs capitalize mb-0.5 ${
                    isSelected ? 'text-green-100' : 'text-gray-400'
                  }`}>
                    {weekDay}
                  </span>

                  {/* Número do dia */}
                  <span className="text-lg font-bold leading-tight">{dayNum}</span>

                  {/* Indicador de progresso — bolinhas */}
                  <div className="flex gap-0.5 mt-1">
                    {counts.total > 0 && Array.from({ length: Math.min(counts.total, 6) }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i < counts.done
                            ? isSelected ? 'bg-green-200' : 'bg-green-500'
                            : isSelected ? 'bg-green-400' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Contagem */}
                  <span className={`text-xs mt-0.5 ${
                    isSelected ? 'text-green-100' : 'text-gray-400'
                  }`}>
                    {counts.done}/{counts.total}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}