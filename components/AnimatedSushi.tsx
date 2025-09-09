'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface SushiProps {
  id: number
  x: number
  y: number
  emoji: string
  vx: number
  vy: number
}

export default function AnimatedSushi() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [sushis, setSushis] = useState<SushiProps[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sushiEmojis = ['🍣', '🍤', '🍱', '🥢', '🍙', '🍘']

  useEffect(() => {
    // Criar sushis iniciais com velocidade
    const initialSushis: SushiProps[] = []
    for (let i = 0; i < 12; i++) {
      initialSushis.push({
        id: i,
        x: Math.random() * 80 + 10, // Evitar bordas
        y: Math.random() * 80 + 10,
        emoji: sushiEmojis[Math.floor(Math.random() * sushiEmojis.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }
    setSushis(initialSushis)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }, [])

  const animate = useCallback(() => {
    setSushis(prevSushis => 
      prevSushis.map(sushi => {
        let newX = sushi.x + sushi.vx
        let newY = sushi.y + sushi.vy
        let newVx = sushi.vx
        let newVy = sushi.vy

        // Calcular distância do mouse
        const dx = sushi.x - mousePosition.x
        const dy = sushi.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Se o mouse estiver perto, fazer o sushi fugir
        if (distance < 20) {
          const angle = Math.atan2(dy, dx)
          const force = 0.8
          newVx = Math.cos(angle) * force
          newVy = Math.sin(angle) * force
        } else {
          // Movimento natural com atrito
          newVx *= 0.98
          newVy *= 0.98
          
          // Adicionar movimento aleatório suave
          newVx += (Math.random() - 0.5) * 0.02
          newVy += (Math.random() - 0.5) * 0.02
        }

        // Limitar velocidade
        const maxSpeed = 1.5
        const speed = Math.sqrt(newVx * newVx + newVy * newVy)
        if (speed > maxSpeed) {
          newVx = (newVx / speed) * maxSpeed
          newVy = (newVy / speed) * maxSpeed
        }

        // Bater nas bordas
        if (newX <= 5 || newX >= 95) {
          newVx *= -0.8
          newX = Math.max(5, Math.min(95, newX))
        }
        if (newY <= 5 || newY >= 95) {
          newVy *= -0.8
          newY = Math.max(5, Math.min(95, newY))
        }

        return { ...sushi, x: newX, y: newY, vx: newVx, vy: newVy }
      })
    )

    animationRef.current = requestAnimationFrame(animate)
  }, [mousePosition])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {sushis.map(sushi => (
        <div
          key={sushi.id}
          className="absolute text-3xl select-none cursor-pointer hover:scale-125 transition-transform duration-200"
          style={{
            left: `${sushi.x}%`,
            top: `${sushi.y}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }}
        >
          {sushi.emoji}
        </div>
      ))}
    </div>
  )
}
