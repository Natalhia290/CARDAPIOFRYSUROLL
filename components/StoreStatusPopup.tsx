'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle, X } from 'lucide-react'

export default function StoreStatusPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [nextOpenTime, setNextOpenTime] = useState('')
  const [showPopup, setShowPopup] = useState(true)

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
      
      setIsStoreOpen(isCurrentlyOpen)
      
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

  // Verificar se o popup já foi fechado hoje
  useEffect(() => {
    const today = new Date().toDateString()
    const closedToday = localStorage.getItem(`storePopupClosed_${today}`)
    if (closedToday) {
      setShowPopup(false)
    }
  }, [])

  const handleClose = () => {
    setShowPopup(false)
    const today = new Date().toDateString()
    localStorage.setItem(`storePopupClosed_${today}`, 'true')
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg shadow-2xl max-w-md w-full p-4 sm:p-6 relative ${
        isStoreOpen ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className={`text-5xl sm:text-6xl mb-4 ${isStoreOpen ? 'text-green-500' : 'text-red-500'}`}>
            {isStoreOpen ? '🍣' : '😴'}
          </div>
          
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
            isStoreOpen ? 'text-green-600' : 'text-red-600'
          }`}>
            {isStoreOpen ? 'Loja Aberta!' : 'Loja Fechada'}
          </h2>
          
          <div className={`flex items-center justify-center space-x-2 mb-4 ${
            isStoreOpen ? 'text-green-600' : 'text-red-600'
          }`}>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-base sm:text-lg font-semibold">
              {isStoreOpen ? `Agora: ${currentTime}` : `Abre às ${nextOpenTime}`}
            </span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Horário de Funcionamento:</h3>
            <p className="text-gray-600 text-sm sm:text-base">18:00 às 23:59</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Todos os dias</p>
          </div>

          {isStoreOpen ? (
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <p className="text-green-800 font-medium text-sm sm:text-base">
                🎉 Estamos prontos para receber seu pedido!
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Frete grátis • Pedido mínimo R$ 50,00
              </p>
            </div>
          ) : (
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
              <p className="text-red-800 font-medium text-sm sm:text-base">
                😔 Estamos fechados no momento
              </p>
              <p className="text-xs sm:text-sm text-red-600 mt-1">
                Volte às {nextOpenTime} para fazer seu pedido!
              </p>
            </div>
          )}

          <button
            onClick={handleClose}
            className="mt-4 bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
