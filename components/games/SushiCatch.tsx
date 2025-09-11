'use client'

import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Target } from 'lucide-react'

interface FallingSushi {
  id: number
  x: number
  y: number
  emoji: string
  points: number
  speed: number
}

interface SushiCatchProps {
  onClose: () => void
}

export default function SushiCatch({ onClose }: SushiCatchProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [playerX, setPlayerX] = useState(50) // Percentage from left
  const [fallingSushis, setFallingSushis] = useState<FallingSushi[]>([])
  const [gameSpeed, setGameSpeed] = useState(1000)
  const [lastSushiId, setLastSushiId] = useState(0)

  const GAME_WIDTH = 400
  const GAME_HEIGHT = 300
  const PLAYER_WIDTH = 60
  const PLAYER_HEIGHT = 40

  const generateSushi = useCallback(() => {
    const sushiTypes = [
      { emoji: '🍣', points: 10, speed: 2 },
      { emoji: '🍱', points: 20, speed: 1.5 },
      { emoji: '🍙', points: 15, speed: 1.8 },
      { emoji: '🥢', points: 5, speed: 3 },
      { emoji: '🍤', points: 25, speed: 1.2 },
      { emoji: '🐟', points: 30, speed: 1 },
      { emoji: '💀', points: -50, speed: 2.5 }, // Bad sushi
    ]
    
    const sushiType = sushiTypes[Math.floor(Math.random() * sushiTypes.length)]
    const newSushi: FallingSushi = {
      id: lastSushiId + 1,
      x: Math.random() * (GAME_WIDTH - 40),
      y: -40,
      emoji: sushiType.emoji,
      points: sushiType.points,
      speed: sushiType.speed + (level * 0.2)
    }
    setLastSushiId(prev => prev + 1)
    return newSushi
  }, [lastSushiId, level])

  const resetGame = () => {
    setScore(0)
    setLives(3)
    setLevel(1)
    setPlayerX(50)
    setFallingSushis([])
    setGameSpeed(1000)
    setLastSushiId(0)
    setGameState('menu')
  }

  const startGame = () => {
    setGameState('playing')
  }

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
  }

  const movePlayer = useCallback((direction: 'left' | 'right') => {
    if (gameState !== 'playing') return
    
    setPlayerX(prev => {
      const newX = direction === 'left' ? prev - 10 : prev + 10
      return Math.max(0, Math.min(100 - (PLAYER_WIDTH / GAME_WIDTH * 100), newX))
    })
  }, [gameState])

  const checkCollision = useCallback((sushi: FallingSushi) => {
    const playerLeft = (playerX / 100) * GAME_WIDTH
    const playerRight = playerLeft + PLAYER_WIDTH
    const playerTop = GAME_HEIGHT - PLAYER_HEIGHT
    const playerBottom = GAME_HEIGHT

    const sushiLeft = sushi.x
    const sushiRight = sushi.x + 40
    const sushiTop = sushi.y
    const sushiBottom = sushi.y + 40

    return (
      sushiLeft < playerRight &&
      sushiRight > playerLeft &&
      sushiTop < playerBottom &&
      sushiBottom > playerTop
    )
  }, [playerX])

  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return

    setFallingSushis(prevSushis => {
      const updatedSushis = prevSushis.map(sushi => ({
        ...sushi,
        y: sushi.y + sushi.speed
      })).filter(sushi => {
        // Check if sushi hit the ground or player
        if (sushi.y >= GAME_HEIGHT - 40) {
          if (checkCollision(sushi)) {
            // Collision with player
            setScore(prev => prev + sushi.points)
            if (sushi.points < 0) {
              setLives(prev => prev - 1)
            }
            return false
          } else if (sushi.points > 0) {
            // Missed good sushi - lose life
            setLives(prev => prev - 1)
            return false
          }
          return false
        }
        return true
      })

      // Add new sushi occasionally
      if (Math.random() < 0.02 + (level * 0.005)) {
        updatedSushis.push(generateSushi())
      }

      return updatedSushis
    })
  }, [gameState, level, checkCollision, generateSushi])

  useEffect(() => {
    const gameLoop = setInterval(updateGame, 16) // ~60 FPS
    return () => clearInterval(gameLoop)
  }, [updateGame])

  useEffect(() => {
    const spawnLoop = setInterval(() => {
      if (gameState === 'playing') {
        setFallingSushis(prev => [...prev, generateSushi()])
      }
    }, gameSpeed)
    return () => clearInterval(spawnLoop)
  }, [gameState, gameSpeed, generateSushi])

  useEffect(() => {
    if (lives <= 0) {
      setGameState('gameOver')
    }
  }, [lives])

  useEffect(() => {
    // Level up every 100 points
    const newLevel = Math.floor(score / 100) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      setGameSpeed(prev => Math.max(300, prev - 50))
    }
  }, [score, level])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer('left')
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer('right')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, movePlayer])

  const handleTouchMove = (direction: 'left' | 'right') => {
    if (gameState !== 'playing') return
    movePlayer(direction)
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">🍣 Pega Sushi</h3>
        <p className="text-gray-600 mb-6">
          Pegue os sushis caindo! Evite os sushis ruins! 🎯
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Como jogar:</h4>
          <ul className="text-sm text-left space-y-1">
            <li>• Use ← → ou A D para mover</li>
            <li>• Pegue sushis bons para ganhar pontos</li>
            <li>• Evite sushis ruins (💀) que tiram vida</li>
            <li>• Você tem 3 vidas</li>
            <li>• A velocidade aumenta a cada nível</li>
          </ul>
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

  if (gameState === 'gameOver') {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">💀</div>
        <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
        <p className="text-gray-600 mb-6">Você perdeu todas as vidas!</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Pontuação Final:</div>
              <div className="text-2xl font-bold text-primary-600">{score}</div>
            </div>
            <div>
              <div className="font-semibold">Nível Alcançado:</div>
              <div className="text-2xl font-bold text-green-600">{level}</div>
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
        <div className="flex space-x-2">
          {gameState === 'playing' && (
            <button
              onClick={togglePause}
              className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              <Pause className="w-4 h-4" />
              <span>Pausar</span>
            </button>
          )}
          {gameState === 'paused' && (
            <button
              onClick={togglePause}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Play className="w-4 h-4" />
              <span>Continuar</span>
            </button>
          )}
          <button
            onClick={resetGame}
            className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
        <div className="text-right text-sm">
          <div className="font-bold">Pontos: {score}</div>
          <div>Vidas: {'❤️'.repeat(lives)}</div>
          <div>Nível: {level}</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4 relative overflow-hidden" style={{ height: GAME_HEIGHT }}>
        {/* Player */}
        <div
          className="absolute bg-blue-500 rounded-lg flex items-center justify-center text-2xl"
          style={{
            left: `${playerX}%`,
            bottom: '10px',
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
            transform: 'translateX(-50%)'
          }}
        >
          🍽️
        </div>

        {/* Falling Sushis */}
        {fallingSushis.map((sushi) => (
          <div
            key={sushi.id}
            className="absolute text-2xl"
            style={{
              left: sushi.x,
              top: sushi.y,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {sushi.emoji}
          </div>
        ))}

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600"></div>
      </div>

      {/* Touch Controls for Mobile */}
      {gameState === 'playing' && (
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => handleTouchMove('left')}
            className="w-16 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-lg font-bold"
          >
            ← ESQ
          </button>
          <button
            onClick={() => handleTouchMove('right')}
            className="w-16 h-12 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center text-lg font-bold"
          >
            DIR →
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600">
        {gameState === 'playing' && (
          <p>Use ← → ou A D para mover! Pegue os sushis! 🎯</p>
        )}
        {gameState === 'paused' && (
          <p>Jogo pausado. Clique em &quot;Continuar&quot; para retomar! ⏸️</p>
        )}
      </div>

      {/* Score breakdown */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-100 p-2 rounded text-center">
          <div className="font-bold">Próximo Nível</div>
          <div>{100 - (score % 100)} pontos</div>
        </div>
        <div className="bg-gray-100 p-2 rounded text-center">
          <div className="font-bold">Velocidade</div>
          <div>{Math.round((1000 - gameSpeed) / 10) + 1}</div>
        </div>
      </div>
    </div>
  )
}
