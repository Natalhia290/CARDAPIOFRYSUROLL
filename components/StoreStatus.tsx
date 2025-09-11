'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'

export default function StoreStatus() {
  const [isOpen, setIsOpen] = useState(false)
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
      
      // Loja abre às 18:00 e fecha às 23:59
      const isCurrentlyOpen = currentHour >= 18 && currentHour <= 23
      
      setIsOpen(isCurrentlyOpen)
      
      // Calcular próximo horário de abertura
      if (!isCurrentlyOpen) {
        const nextOpen = new Date()
        if (currentHour < 18) {
          // Se for antes das 18h, abre hoje às 18h
          nextOpen.setHours(18, 0, 0, 0)
        } else {
          // Se for depois das 23h59, abre amanhã às 18h
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
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
      isOpen 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {isOpen ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Loja Aberta</span>
          <Clock className="w-4 h-4" />
          <span>{currentTime}</span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4" />
          <span>Loja Fechada</span>
          <Clock className="w-4 h-4" />
          <span>Abre às {nextOpenTime}</span>
        </>
      )}
    </div>
  )
}
