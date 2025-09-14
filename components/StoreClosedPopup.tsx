'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Phone, MapPin, Calendar } from 'lucide-react'

export default function StoreClosedPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(false)
  const [nextOpenTime, setNextOpenTime] = useState('')

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      
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
        
        // Mostra o popup se a loja estiver fechada
        setIsVisible(true)
      }
    }

    checkStoreStatus()
    const interval = setInterval(checkStoreStatus, 60000) // Atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `🍣 Olá! Vi que a loja está fechada agora, mas gostaria de fazer um pedido para quando abrir! 🍣\n\n` +
      `Podem me avisar quando estiverem funcionando? Obrigado! 😊`
    )
    window.open(`https://wa.me/5562995045038?text=${message}`, '_blank')
  }

  if (!isVisible || isStoreOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-red-500 text-white p-6 rounded-t-2xl text-center relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-6xl mb-4">🍣</div>
          <h2 className="text-2xl font-bold mb-2">Loja Fechada</h2>
          <p className="text-red-100">Mas não se preocupe!</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Horário */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Próxima abertura:</span>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {nextOpenTime}
            </div>
          </div>

          {/* Mensagem principal */}
          <div className="text-center space-y-3">
            <p className="text-gray-700 text-lg">
              Que tal deixar seu pedido preparado?
            </p>
            <p className="text-gray-600">
              Envie uma mensagem no WhatsApp e garantimos que seu pedido estará pronto quando abrirmos! 🚀
            </p>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Enviar Pedido no WhatsApp</span>
            </button>
            
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-300"
            >
              Voltar ao Site
            </button>
          </div>

          {/* Informações adicionais */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Entregamos em toda Goiânia</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Funcionamos todos os dias das 18h às 23h59</span>
            </div>
          </div>

          {/* Call to action final */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              💡 <strong>Dica:</strong> Peça agora e receba na hora da abertura!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
