'use client'

import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, CheckCircle, Clock, Star } from 'lucide-react'

interface PuzzlePiece {
  id: number
  emoji: string
  position: number
  isCorrect: boolean
}

interface SushiPuzzleProps {
  onClose: () => void
}

const sushiPuzzles = [
  {
    name: 'Sushi Básico',
    emojis: ['🍚', '🐟', '🥒', '🍣'],
    description: 'Monte um sushi básico'
  },
  {
    name: 'Bentô Completo',
    emojis: ['🍱', '🍣', '🍙', '🥢', '🍤', '🥒'],
    description: 'Monte um bentô completo'
  },
  {
    name: 'Sushi Especial',
    emojis: ['🍣', '🥑', '🍤', '🌶️', '🍋', '🐟'],
    description: 'Monte um sushi especial'
  }
]

export default function SushiPuzzle({ onClose }: SushiPuzzleProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu')
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [completedPuzzles, setCompletedPuzzles] = useState(0)

  const currentPuzzleData = sushiPuzzles[currentPuzzle]

  const createPuzzle = useCallback(() => {
    const puzzleData = sushiPuzzles[currentPuzzle]
    const shuffledEmojis = [...puzzleData.emojis].sort(() => Math.random() - 0.5)
    
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      position: index,
      isCorrect: false
    }))
  }, [currentPuzzle])

  const startGame = useCallback(() => {
    setPieces(createPuzzle())
    setSelectedPiece(null)
    setMoves(0)
    setTime(0)
    setGameState('playing')
  }, [createPuzzle])

  const resetGame = () => {
    setGameState('menu')
    setPieces([])
    setSelectedPiece(null)
    setMoves(0)
    setTime(0)
    setCompletedPuzzles(0)
  }

  const nextPuzzle = useCallback(() => {
    if (currentPuzzle < sushiPuzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1)
      setCompletedPuzzles(prev => prev + 1)
      startGame()
    } else {
      setCompletedPuzzles(prev => prev + 1)
      setGameState('completed')
    }
  }, [currentPuzzle, startGame])

  const handlePieceClick = (pieceId: number) => {
    if (gameState !== 'playing') return

    if (selectedPiece === null) {
      setSelectedPiece(pieceId)
    } else if (selectedPiece === pieceId) {
      setSelectedPiece(null)
    } else {
      // Swap pieces
      setPieces(prevPieces => {
        const newPieces = [...prevPieces]
        const piece1Index = newPieces.findIndex(p => p.id === selectedPiece)
        const piece2Index = newPieces.findIndex(p => p.id === pieceId)
        
        // Swap positions
        const tempPosition = newPieces[piece1Index].position
        newPieces[piece1Index].position = newPieces[piece2Index].position
        newPieces[piece2Index].position = tempPosition
        
        return newPieces
      })
      
      setMoves(prev => prev + 1)
      setSelectedPiece(null)
    }
  }

  const checkWin = useCallback(() => {
    const puzzleData = sushiPuzzles[currentPuzzle]
    const isCorrect = pieces.every((piece, index) => 
      piece.emoji === puzzleData.emojis[index]
    )
    
    if (isCorrect) {
      setPieces(prevPieces => 
        prevPieces.map(piece => ({ ...piece, isCorrect: true }))
      )
      setTimeout(() => {
        nextPuzzle()
      }, 1000)
    }
  }, [pieces, currentPuzzle, nextPuzzle])

  useEffect(() => {
    checkWin()
  }, [pieces, checkWin])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScore = () => {
    const baseScore = 1000
    const timeBonus = Math.max(0, 300 - time) * 2
    const moveBonus = Math.max(0, (currentPuzzleData.emojis.length * 2) - moves) * 10
    return baseScore + timeBonus + moveBonus
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">🧩 Quebra Sushi</h3>
        <p className="text-gray-600 mb-6">
          Monte os quebra-cabeças de sushi! Organize as peças na ordem correta! 🍣
        </p>
        
        <div className="space-y-3 mb-6">
          {sushiPuzzles.map((puzzle, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPuzzle(index)
                startGame()
              }}
              className="w-full p-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-lg font-bold">{puzzle.name}</div>
              <div className="text-sm opacity-90">{puzzle.description}</div>
              <div className="flex justify-center space-x-1 mt-2">
                {puzzle.emojis.map((emoji, i) => (
                  <span key={i} className="text-xl">{emoji}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Como jogar:</h4>
          <ul className="text-sm text-left space-y-1">
            <li>• Clique em duas peças para trocar de posição</li>
            <li>• Monte na ordem correta mostrada no exemplo</li>
            <li>• Complete todos os quebra-cabeças</li>
            <li>• Menos movimentos = mais pontos</li>
          </ul>
        </div>
      </div>
    )
  }

  if (gameState === 'completed') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4">Parabéns!</h3>
        <p className="text-gray-600 mb-6">Você completou todos os quebra-cabeças!</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Tempo Total:</div>
              <div className="flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(time)}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">Pontuação:</div>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{getScore()}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">Quebra-cabeças:</div>
              <div>{completedPuzzles}/{sushiPuzzles.length}</div>
            </div>
            <div>
              <div className="font-semibold">Movimentos:</div>
              <div>{moves}</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={resetGame}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Jogar Novamente
          </button>
          <button
            onClick={resetGame}
            className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime(time)}</span>
          </div>
          <div>Movimentos: {moves}</div>
          <div>Puzzle: {currentPuzzle + 1}/{sushiPuzzles.length}</div>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Puzzle Info */}
      <div className="bg-gray-100 p-3 rounded-lg mb-4">
        <h4 className="font-semibold text-center mb-2">{currentPuzzleData.name}</h4>
        <p className="text-sm text-gray-600 text-center mb-2">{currentPuzzleData.description}</p>
        <div className="flex justify-center space-x-1">
          {currentPuzzleData.emojis.map((emoji, index) => (
            <div key={index} className="text-2xl">{emoji}</div>
          ))}
        </div>
      </div>

      {/* Puzzle Pieces */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {pieces.map((piece) => (
          <button
            key={piece.id}
            onClick={() => handlePieceClick(piece.id)}
            className={`
              p-4 rounded-lg border-2 text-3xl transition-all duration-300 transform hover:scale-105
              ${selectedPiece === piece.id
                ? 'border-blue-500 bg-blue-100 ring-2 ring-blue-300'
                : piece.isCorrect
                ? 'border-green-500 bg-green-100'
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}
          >
            {piece.emoji}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600">
        <p>Clique em duas peças para trocar de posição! 🧩</p>
        <p className="mt-1">Monte na ordem mostrada acima! 🎯</p>
      </div>

      {/* Progress */}
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentPuzzle + 1) / sushiPuzzles.length) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
