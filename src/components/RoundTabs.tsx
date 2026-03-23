interface RoundTabsProps {
  rounds: number[]
  selected: number
  onChange: (round: number) => void
  betCountByRound: Record<number, { done: number; total: number }>
}

export default function RoundTabs({
  rounds, selected, onChange, betCountByRound
}: RoundTabsProps) {
  return (
    <div className="flex gap-2 mb-1">
      {rounds.map(round => {
        const counts   = betCountByRound[round] ?? { done: 0, total: 0 }
        const isActive = selected === round
        const percent  = counts.total > 0
          ? Math.round((counts.done / counts.total) * 100)
          : 0
        const allDone  = counts.total > 0 && counts.done === counts.total

        return (
          <button
            key={round}
            onClick={() => onChange(round)}
            className={`flex-1 py-3 px-3 rounded-xl text-sm font-semibold
                        transition-all border-2 relative overflow-hidden ${
              isActive
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {/* Barra de progresso de fundo */}
            <div
              className={`absolute bottom-0 left-0 h-1 transition-all duration-500 rounded-b-xl ${
                isActive ? 'bg-green-400' : 'bg-gray-200'
              }`}
              style={{ width: `${percent}%` }}
            />

            {/* Badge completo */}
            {allDone && (
              <span className="absolute top-1.5 right-1.5 text-xs bg-green-500
                               text-white rounded-full w-4 h-4 flex items-center
                               justify-center leading-none">
                ✓
              </span>
            )}

            {/* Label */}
            <p className="leading-tight">Rodada {round}</p>

            {/* Contagem */}
            <p className={`text-xs font-normal mt-0.5 ${
              isActive ? 'text-green-500' : 'text-gray-400'
            }`}>
              {counts.done}/{counts.total} palpites
            </p>
          </button>
        )
      })}
    </div>
  )
}