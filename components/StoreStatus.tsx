'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function StoreStatus() {
  const [isStoreOpen, setIsStoreOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [nextOpenTime, setNextOpenTime] = useState('')

  const checkStoreStatus = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Formata a hora atual
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setCurrentTime(formattedTime)
    
    // Loja aberta das 18:00 às 21:30 (hoje) ou 23:59 (outros dias)
    const today = new Date()
    const isToday = today.getDate() === new Date().getDate()
    const isOpen = currentHour >= 18 && (isToday ? currentHour < 21 || (currentHour === 21 && currentMinute <= 30) : currentHour <= 23)
    setIsStoreOpen(isOpen)

    if (!isOpen) {
      // Se estiver fechado, calcula o próximo horário de abertura (18:00 do próximo dia ou hoje se for antes das 18:00)
      let nextOpen = new Date(now)
      if (currentHour >= 23 || (currentHour === 23 && currentMinute >= 59)) { // Se já passou das 23:59, abre no próximo dia
        nextOpen.setDate(nextOpen.getDate() + 1)
        nextOpen.setHours(18, 0, 0, 0)
      } else if (currentHour < 18) { // Se for antes das 18:00, abre hoje às 18:00
        nextOpen.setHours(18, 0, 0, 0)
      } else { // Se for depois das 21:30 (hoje) e antes das 23:59, abre no próximo dia
        nextOpen.setDate(nextOpen.getDate() + 1)
        nextOpen.setHours(18, 0, 0, 0)
      }
      setNextOpenTime(nextOpen.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }
  }

  useEffect(() => {
    checkStoreStatus()
    const interval = setInterval(checkStoreStatus, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`w-full py-3 px-4 text-center text-sm font-bold relative overflow-hidden ${
      isStoreOpen 
        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
        : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
    }`}>
      <div className="flex items-center justify-center gap-3">
        {isStoreOpen ? (
          <>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span className="text-lg">🍣 LOJA ABERTA - Hoje até às 21:30</span>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
            <XCircle className="w-5 h-5 text-red-300" />
            <span className="text-lg">🍣 LOJA FECHADA - Próxima abertura: {nextOpenTime}</span>
            <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </>
        )}
        <Clock className="w-5 h-5 text-amber-300" />
        <span className="text-amber-200 font-mono text-lg">{currentTime}</span>
      </div>
    </div>
  )
}