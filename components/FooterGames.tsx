'use client'

import { useState } from 'react'
import { Gamepad2, X, RotateCcw } from 'lucide-react'
import SnakeGame from './games/SnakeGame'
import MemoryGame from './games/MemoryGame'
import SushiCatch from './games/SushiCatch'
import SushiPuzzle from './games/SushiPuzzle'
import SushiQuiz from './games/SushiQuiz'

const games = [
  { id: 'snake', name: '🐍 Cobrinha Sushi', component: SnakeGame },
  { id: 'memory', name: '🧠 Memória Sushi', component: MemoryGame },
  { id: 'catch', name: '🍣 Pega Sushi', component: SushiCatch },
  { id: 'puzzle', name: '🧩 Quebra Sushi', component: SushiPuzzle },
  { id: 'quiz', name: '❓ Quiz Sushi', component: SushiQuiz },
]

export default function FooterGames() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  const openGame = (gameId: string) => {
    setCurrentGame(gameId)
    setIsOpen(true)
  }

  const closeGame = () => {
    setCurrentGame(null)
    setIsOpen(false)
  }

  const CurrentGameComponent = currentGame ? games.find(g => g.id === currentGame)?.component : null

  return (
    <>
      {/* Botão para abrir jogos */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg cursor-pointer hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105" onClick={() => setIsOpen(true)}>
        <div className="flex items-center justify-center space-x-2 text-white">
          <Gamepad2 className="w-5 h-5" />
          <span className="font-bold text-lg">🎮 Paciência enquanto meu pedido não chega</span>
          <Gamepad2 className="w-5 h-5" />
        </div>
        <p className="text-green-100 text-sm text-center mt-1">
          Clique aqui e divirta-se com nossos joguinhos!
        </p>
      </div>

      {/* Modal de jogos */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <h2 className="text-xl font-bold">🎮 Jogos FrySuRoll</h2>
              <button
                onClick={closeGame}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {!currentGame ? (
                // Lista de jogos
                <div>
                  <p className="text-gray-600 mb-6 text-center">
                    Escolha um jogo para se divertir enquanto espera seu pedido chegar! 🍣
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {games.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => openGame(game.id)}
                        className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-4 rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{game.name.split(' ')[0]}</div>
                          <div className="font-semibold">{game.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Jogo selecionado
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {games.find(g => g.id === currentGame)?.name}
                    </h3>
                    <button
                      onClick={() => setCurrentGame(null)}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Voltar</span>
                    </button>
                  </div>
                  <div className="min-h-[400px]">
                    {CurrentGameComponent && <CurrentGameComponent onClose={closeGame} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
