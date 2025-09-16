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
    <div className={`w-full py-4 px-4 text-center text-sm font-bold relative overflow-hidden ${
      isStoreOpen 
        ? 'bg-gradient-to-r from-green-800 to-emerald-800 text-green-100 border-b border-green-400/30' 
        : 'bg-gradient-to-r from-red-800 to-red-900 text-red-100 border-b border-red-400/30'
    }`}>
      <div className="absolute inset-0 japanese-grid opacity-20"></div>
      <div className="relative z-10 flex items-center justify-center gap-4">
        {isStoreOpen ? (
          <>
            <div className="w-4 h-4 bg-green-400 rounded-full japanese-pulse"></div>
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-xl">🍣 LOJA ABERTA - Hoje até às 21:30</span>
            <div className="w-4 h-4 bg-green-400 rounded-full japanese-pulse" style={{animationDelay: '1s'}}></div>
          </>
        ) : (
          <>
            <div className="w-4 h-4 bg-red-400 rounded-full japanese-pulse"></div>
            <XCircle className="w-6 h-6 text-red-400" />
            <span className="text-xl">🍣 LOJA FECHADA - Próxima abertura: {nextOpenTime}</span>
            <div className="w-4 h-4 bg-red-400 rounded-full japanese-pulse" style={{animationDelay: '1s'}}></div>
          </>
        )}
        <Clock className="w-6 h-6 text-amber-400" />
        <span className="text-amber-200 font-mono text-lg">{currentTime}</span>
      </div>
    </div>
  )
}