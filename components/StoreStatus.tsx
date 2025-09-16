'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

export default function StoreStatus() {
  const [isStoreOpen, setIsStoreOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [nextOpenTime, setNextOpenTime] = useState('')

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTimeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      setCurrentTime(currentTimeString)
      
      // Loja aberta das 18:00 às 21:30 (hoje) ou 23:59 (outros dias)
      const today = new Date()
      const isToday = today.getDate() === new Date().getDate()
      const isOpen = currentHour >= 18 && (isToday ? currentHour < 21 || (currentHour === 21 && currentMinute <= 30) : currentHour <= 23)
      setIsStoreOpen(isOpen)
      
      if (!isOpen) {
        // Calcular próxima abertura
        const nextOpen = new Date()
        if (currentHour < 18) {
          nextOpen.setHours(18, 0, 0, 0)
        } else {
          nextOpen.setDate(nextOpen.getDate() + 1)
          nextOpen.setHours(18, 0, 0, 0)
        }
        setNextOpenTime(nextOpen.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }))
      }
    }

    checkStoreStatus()
    const interval = setInterval(checkStoreStatus, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`w-full py-3 px-4 text-center text-sm font-bold relative overflow-hidden ${
      isStoreOpen 
        ? 'bg-gradient-to-r from-green-900 to-emerald-900 text-green-300 border-b border-green-500/30' 
        : 'bg-gradient-to-r from-red-900 to-pink-900 text-red-300 border-b border-red-500/30'
    }`}>
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="relative z-10 flex items-center justify-center gap-3">
        {isStoreOpen ? (
          <>
            <div className="w-3 h-3 bg-green-400 rounded-full tech-pulse"></div>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-lg">🍣 LOJA ABERTA - Hoje até às 21:30</span>
            <div className="w-3 h-3 bg-green-400 rounded-full tech-pulse" style={{animationDelay: '1s'}}></div>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-400 rounded-full tech-pulse"></div>
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-lg">🍣 LOJA FECHADA - Próxima abertura: {nextOpenTime}</span>
            <div className="w-3 h-3 bg-red-400 rounded-full tech-pulse" style={{animationDelay: '1s'}}></div>
          </>
        )}
        <Clock className="w-5 h-5 text-cyan-400" />
        <span className="text-cyan-300 font-mono">{currentTime}</span>
      </div>
    </div>
  )
}