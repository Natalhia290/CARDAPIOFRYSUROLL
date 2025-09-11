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
      
      // Loja aberta das 18:00 às 23:59
      const isOpen = currentHour >= 18 && currentHour <= 23
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
    <div className={`w-full py-2 px-4 text-center text-sm font-medium ${
      isStoreOpen 
        ? 'bg-green-100 text-green-800 border-b border-green-200' 
        : 'bg-red-100 text-red-800 border-b border-red-200'
    }`}>
      <div className="flex items-center justify-center gap-2">
        {isStoreOpen ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>🍣 LOJA ABERTA - Funcionamento: 18:00 às 23:59</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4" />
            <span>🍣 LOJA FECHADA - Próxima abertura: {nextOpenTime}</span>
          </>
        )}
        <Clock className="w-4 h-4" />
        <span>{currentTime}</span>
      </div>
    </div>
  )
}