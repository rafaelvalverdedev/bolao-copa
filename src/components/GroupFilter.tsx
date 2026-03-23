interface GroupFilterProps {
  groups: string[]        // lista de grupos disponíveis
  selected: string        // grupo atualmente selecionado
  onChange: (group: string) => void
}

export default function GroupFilter({ groups, selected, onChange }: GroupFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {/* Botão "Todos" */}
      <button
        onClick={() => onChange('todos')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          selected === 'todos'
            ? 'bg-green-600 text-white shadow-sm'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
        }`}
      >
        Todos
      </button>

      {/* Um botão por grupo */}
      {groups.map(group => (
        <button
          key={group}
          onClick={() => onChange(group)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected === group
              ? 'bg-green-600 text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
          }`}
        >
          {group}
        </button>
      ))}
    </div>
  )
}