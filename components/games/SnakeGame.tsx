'use client'

import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface SnakeGameProps {
  onClose: () => void
}

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 })
  const [gameSpeed, setGameSpeed] = useState(150)

  const GRID_SIZE = 20
  const CELL_SIZE = 20

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    setFood(newFood)
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 0, y: 0 })
    setScore(0)
    setGameSpeed(150)
    generateFood()
    setGameState('menu')
  }

  const startGame = () => {
    setGameState('playing')
    setDirection({ x: 1, y: 0 })
  }

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
  }

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }
      
      // Só move se tiver direção definida
      if (direction.x === 0 && direction.y === 0) return prevSnake
      
      head.x += direction.x
      head.y += direction.y

      // Verificar colisão com paredes
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('gameOver')
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      // Verificar colisão com próprio corpo
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver')
        if (score > highScore) {
          setHighScore(score)
        }
        return prevSnake
      }

      newSnake.unshift(head)

      // Verificar se comeu a comida
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10
          if (newScore % 50 === 0 && gameSpeed > 80) {
            setGameSpeed(prev => prev - 10)
          }
          return newScore
        })
        generateFood()
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, gameState, food, score, highScore, gameSpeed, generateFood])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameSpeed)
    return () => clearInterval(gameLoop)
  }, [moveSnake, gameSpeed])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameState])

  const handleTouchMove = (moveDirection: 'up' | 'down' | 'left' | 'right') => {
    if (gameState !== 'playing') return

    switch (moveDirection) {
      case 'up':
        if (direction.y === 0) setDirection({ x: 0, y: -1 })
        break
      case 'down':
        if (direction.y === 0) setDirection({ x: 0, y: 1 })
        break
      case 'left':
        if (direction.x === 0) setDirection({ x: -1, y: 0 })
        break
      case 'right':
        if (direction.x === 0) setDirection({ x: 1, y: 0 })
        break
    }
  }

  const getSnakeEmoji = (index: number) => {
    if (index === 0) return '🐍' // Cabeça
    return '🟢' // Corpo
  }

  const getFoodEmoji = () => {
    const foodEmojis = ['🍣', '🍱', '🍙', '🥢', '🍤']
    return foodEmojis[Math.floor(Math.random() * foodEmojis.length)]
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Controles */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {gameState === 'menu' && (
            <button
              onClick={startGame}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Iniciar</span>
            </button>
          )}
          {gameState === 'playing' && (
            <button
              onClick={togglePause}
              className="flex items-center space-x-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span>Pausar</span>
            </button>
          )}
          {gameState === 'paused' && (
            <button
              onClick={togglePause}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Continuar</span>
            </button>
          )}
          <button
            onClick={resetGame}
            className="flex items-center space-x-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary-600">Pontos: {score}</div>
          <div className="text-sm text-gray-600">Recorde: {highScore}</div>
        </div>
      </div>

      {/* Jogo */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div 
          className="relative mx-auto border-2 border-gray-700 rounded"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE 
          }}
        >
          {/* Cobrinha */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute text-2xl"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getSnakeEmoji(index)}
            </div>
          ))}

          {/* Comida */}
          <div
            className="absolute text-2xl"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {getFoodEmoji()}
          </div>
        </div>
      </div>

      {/* Touch Controls for Mobile */}
      {gameState === 'playing' && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-center">
            <button
              onClick={() => handleTouchMove('up')}
              className="w-12 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            >
              ⬆️
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleTouchMove('left')}
              className="w-12 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            >
              ⬅️
            </button>
            <button
              onClick={() => handleTouchMove('right')}
              className="w-12 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            >
              ➡️
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleTouchMove('down')}
              className="w-12 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
            >
              ⬇️
            </button>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="text-center text-sm text-gray-600 mb-4">
        {gameState === 'menu' && (
          <p>Use as setas do teclado ou WASD para controlar a cobrinha! 🐍</p>
        )}
        {gameState === 'playing' && (
          <p>Colete os sushis para ganhar pontos! Use as setas ou botões! ⬆️⬇️⬅️➡️</p>
        )}
        {gameState === 'paused' && (
          <p>Jogo pausado. Clique em &quot;Continuar&quot; para retomar! ⏸️</p>
        )}
        {gameState === 'gameOver' && (
          <div>
            <p className="text-red-600 font-bold mb-2">Game Over! 💀</p>
            <p>Você perdeu! Tente novamente! 🎮</p>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-gray-100 p-2 rounded">
          <div className="font-bold">Tamanho</div>
          <div>{snake.length}</div>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <div className="font-bold">Velocidade</div>
          <div>{Math.round((150 - gameSpeed) / 10) + 1}</div>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <div className="font-bold">Nível</div>
          <div>{Math.floor(score / 50) + 1}</div>
        </div>
      </div>
    </div>
  )
}
