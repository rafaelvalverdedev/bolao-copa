export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-5xl mb-4 animate-bounce">⚽</p>
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    </div>
  )
}