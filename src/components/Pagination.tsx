interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      {/* Botão anterior */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl border border-gray-200 text-gray-500
                   hover:border-green-400 hover:text-green-600 disabled:opacity-30
                   disabled:cursor-not-allowed transition-all font-medium text-sm"
      >
        ‹
      </button>

      {/* Números das páginas */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
            page === currentPage
              ? 'bg-green-600 text-white shadow-sm'
              : 'border border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botão próximo */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl border border-gray-200 text-gray-500
                   hover:border-green-400 hover:text-green-600 disabled:opacity-30
                   disabled:cursor-not-allowed transition-all font-medium text-sm"
      >
        ›
      </button>
    </div>
  )
}