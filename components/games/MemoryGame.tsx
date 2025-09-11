'use client'

import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, Clock, Star } from 'lucide-react'

interface Card {
  id: number
  emoji: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

interface MemoryGameProps {
  onClose: () => void
}

const sushiIngredients = [
  { emoji: '🍣', name: 'Sushi' },
  { emoji: '🍱', name: 'Bentô' },
  { emoji: '🍙', name: 'Onigiri' },
  { emoji: '🥢', name: 'Hashi' },
  { emoji: '🍤', name: 'Camarão' },
  { emoji: '🐟', name: 'Peixe' },
  { emoji: '🥒', name: 'Pepino' },
  { emoji: '🥑', name: 'Abacate' },
  { emoji: '🍚', name: 'Arroz' },
  { emoji: '🌶️', name: 'Pimenta' },
  { emoji: '🧄', name: 'Alho' },
  { emoji: '🍋', name: 'Limão' }
]

export default function MemoryGame({ onClose }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [time, setTime] = useState(0)
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  const getCardCount = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 8
      case 'medium': return 12
      case 'hard': return 16
      default: return 8
    }
  }, [difficulty])

  const createCards = () => {
    const cardCount = getCardCount()
    const selectedIngredients = sushiIngredients.slice(0, cardCount / 2)
    const cardData = [...selectedIngredients, ...selectedIngredients]
    
    return cardData
      .map((ingredient, index) => ({
        id: index,
        emoji: ingredient.emoji,
        name: ingredient.name,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)
  }

  const startGame = () => {
    setCards(createCards())
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setTime(0)
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setCards([])
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setTime(0)
  }

  const handleCardClick = (cardId: number) => {
    if (gameState !== 'playing') return
    if (flippedCards.length >= 2) return
    if (flippedCards.includes(cardId)) return

    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    )

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      
      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find(c => c.id === firstId)
      const secondCard = cards.find(c => c.id === secondId)

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          )
          setMatches(prev => prev + 1)
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

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

  // Check if game is completed
  useEffect(() => {
    if (matches > 0 && matches === getCardCount() / 2) {
      setGameState('completed')
    }
  }, [matches, difficulty, getCardCount])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScore = () => {
    const totalPairs = getCardCount() / 2
    const timeBonus = Math.max(0, 300 - time) // Bonus for finishing quickly
    const moveBonus = Math.max(0, (totalPairs * 2) - moves) // Bonus for fewer moves
    return (matches * 100) + timeBonus + moveBonus
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">🧠 Memória Sushi</h3>
        <p className="text-gray-600 mb-6">
          Encontre os pares de ingredientes de sushi! Teste sua memória! 🍣
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Escolha a dificuldade:</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setDifficulty('easy')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                difficulty === 'easy'
                  ? 'border-green-500 bg-green-100 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-bold">Fácil</div>
              <div className="text-sm">4 pares</div>
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                difficulty === 'medium'
                  ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-bold">Médio</div>
              <div className="text-sm">6 pares</div>
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                difficulty === 'hard'
                  ? 'border-red-500 bg-red-100 text-red-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-bold">Difícil</div>
              <div className="text-sm">8 pares</div>
            </button>
          </div>
        </div>

        <button
          onClick={startGame}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          🎮 Iniciar Jogo
        </button>
      </div>
    )
  }

  if (gameState === 'completed') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4">Parabéns!</h3>
        <p className="text-gray-600 mb-6">Você completou o jogo da memória!</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Tempo:</div>
              <div className="flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(time)}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">Movimentos:</div>
              <div>{moves}</div>
            </div>
            <div>
              <div className="font-semibold">Pontuação:</div>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{getScore()}</span>
              </div>
            </div>
            <div>
              <div className="font-semibold">Dificuldade:</div>
              <div className="capitalize">{difficulty}</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={startGame}
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
          <div>Pares: {matches}/{getCardCount() / 2}</div>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Game Grid */}
      <div 
        className="grid gap-2 mx-auto mb-4"
        style={{
          gridTemplateColumns: `repeat(${difficulty === 'easy' ? 4 : difficulty === 'medium' ? 4 : 4}, 1fr)`,
          width: 'fit-content'
        }}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              w-12 h-12 sm:w-16 sm:h-16 rounded-lg border-2 flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 transform hover:scale-105 active:scale-95
              ${card.isFlipped || card.isMatched
                ? 'bg-white border-primary-500 scale-105'
                : 'bg-gray-200 border-gray-300 hover:border-gray-400 hover:scale-105'
              }
              ${card.isMatched ? 'bg-green-100 border-green-500' : ''}
              ${flippedCards.includes(card.id) ? 'ring-2 ring-primary-300' : ''}
            `}
            disabled={card.isFlipped || card.isMatched}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600">
        <p>Clique nas cartas para encontrar os pares! 🍣</p>
        <p className="mt-1">Encontre todos os {getCardCount() / 2} pares para vencer!</p>
      </div>
    </div>
  )
}
