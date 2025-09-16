'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, RotateCcw, Trophy, Star } from 'lucide-react'

interface GameTile {
  id: string
  type: number
  x: number
  y: number
  isSelected: boolean
  isMatched: boolean
}

const TILE_TYPES = ['🍣', '🍤', '🍱', '🥢', '🍙', '🍘']
const BOARD_SIZE = 8
const MIN_MATCH = 3

export default function SushiGame({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState<GameTile[]>([])
  const [selectedTiles, setSelectedTiles] = useState<GameTile[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const createBoard = useCallback(() => {
    const newBoard: GameTile[] = []
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        newBoard.push({
          id: `${x}-${y}`,
          type: Math.floor(Math.random() * TILE_TYPES.length),
          x,
          y,
          isSelected: false,
          isMatched: false
        })
      }
    }
    return newBoard
  }, [])

  useEffect(() => {
    setBoard(createBoard())
  }, [createBoard])

  const handleTileClick = (tile: GameTile) => {
    if (isAnimating || gameOver || tile.isMatched) return

    if (selectedTiles.length === 0) {
      setSelectedTiles([tile])
      setBoard(prev => prev.map(t => 
        t.id === tile.id ? { ...t, isSelected: true } : t
      ))
    } else if (selectedTiles.length === 1) {
      const firstTile = selectedTiles[0]
      const isAdjacent = Math.abs(tile.x - firstTile.x) + Math.abs(tile.y - firstTile.y) === 1
      
      if (isAdjacent) {
        // Swap tiles
        setBoard(prev => prev.map(t => {
          if (t.id === firstTile.id) return { ...t, type: tile.type, isSelected: false }
          if (t.id === tile.id) return { ...t, type: firstTile.type, isSelected: false }
          return { ...t, isSelected: false }
        }))
        
        setMoves(prev => prev - 1)
        setSelectedTiles([])
        checkMatches()
      } else {
        // Select new tile
        setBoard(prev => prev.map(t => ({ ...t, isSelected: t.id === tile.id })))
        setSelectedTiles([tile])
      }
    }
  }

  const checkMatches = useCallback(() => {
    setIsAnimating(true)
    
    setTimeout(() => {
      setBoard(prev => {
        const newBoard = [...prev]
        let newScore = score
        let hasMatches = false

        // Check horizontal matches
        for (let y = 0; y < BOARD_SIZE; y++) {
          for (let x = 0; x < BOARD_SIZE - 2; x++) {
            const tile1 = newBoard.find(t => t.x === x && t.y === y)
            const tile2 = newBoard.find(t => t.x === x + 1 && t.y === y)
            const tile3 = newBoard.find(t => t.x === x + 2 && t.y === y)
            
            if (tile1 && tile2 && tile3 && 
                tile1.type === tile2.type && tile2.type === tile3.type) {
              tile1.isMatched = true
              tile2.isMatched = true
              tile3.isMatched = true
              newScore += 10
              hasMatches = true
            }
          }
        }

        // Check vertical matches
        for (let x = 0; x < BOARD_SIZE; x++) {
          for (let y = 0; y < BOARD_SIZE - 2; y++) {
            const tile1 = newBoard.find(t => t.x === x && t.y === y)
            const tile2 = newBoard.find(t => t.x === x && t.y === y + 1)
            const tile3 = newBoard.find(t => t.x === x && t.y === y + 2)
            
            if (tile1 && tile2 && tile3 && 
                tile1.type === tile2.type && tile2.type === tile3.type) {
              tile1.isMatched = true
              tile2.isMatched = true
              tile3.isMatched = true
              newScore += 10
              hasMatches = true
            }
          }
        }

        setScore(newScore)

        if (hasMatches) {
          // Remove matched tiles and fill with new ones
          setTimeout(() => {
            setBoard(prev => prev.map(tile => 
              tile.isMatched 
                ? { ...tile, type: Math.floor(Math.random() * TILE_TYPES.length), isMatched: false }
                : tile
            ))
            setIsAnimating(false)
            checkMatches() // Check for new matches
          }, 500)
        } else {
          setIsAnimating(false)
        }

        return newBoard
      })
    }, 300)
  }, [score])

  useEffect(() => {
    if (moves <= 0) {
      setGameOver(true)
    }
  }, [moves])

  const resetGame = () => {
    setBoard(createBoard())
    setScore(0)
    setMoves(30)
    setGameOver(false)
    setSelectedTiles([])
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <span>Sushi Game</span>
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Game Stats */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{score}</span>
            </div>
            <div className="text-sm text-gray-600">
              Moves: {moves}
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        {/* Game Board */}
        <div className="p-4">
          {gameOver ? (
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Game Over!</h3>
              <p className="text-gray-600 mb-4">Sua pontuação: {score}</p>
              <button
                onClick={resetGame}
                className="btn-primary"
              >
                Jogar Novamente
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-1 bg-gray-200 p-2 rounded-lg">
              {board.map(tile => (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile)}
                  className={`w-8 h-8 text-lg rounded transition-all duration-200 ${
                    tile.isSelected 
                      ? 'bg-yellow-300 scale-110' 
                      : tile.isMatched 
                        ? 'bg-green-300 scale-95' 
                        : 'bg-white hover:bg-gray-100'
                  } ${isAnimating ? 'pointer-events-none' : ''}`}
                >
                  {TILE_TYPES[tile.type]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          <p className="text-center">
            Clique em dois sushis adjacentes para trocá-los e formar combinações de 3 ou mais!
          </p>
        </div>
      </div>
    </div>
  )
}








