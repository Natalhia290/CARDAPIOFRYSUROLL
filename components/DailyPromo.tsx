'use client'

import { useState, useEffect } from 'react'
import { X, Star, Clock, Zap } from 'lucide-react'

export default function DailyPromo() {
  const [isVisible, setIsVisible] = useState(false)
  const [promoData, setPromoData] = useState({
    title: '',
    description: '',
    discount: '',
    icon: '🔥',
    bgColor: 'bg-gradient-to-r from-red-500 to-orange-500',
    textColor: 'text-white'
  })

  useEffect(() => {
    const checkPromo = () => {
      const today = new Date()
      const dayOfWeek = today.getDay() // 0 = Domingo, 1 = Segunda, etc.
      
      const promos = {
        0: { // Domingo
          title: 'DOMINGO É DIA DE MEGA PROMOÇÃO! 🍣',
          description: 'Sushidogroll Casal Salmão (2 unidades) por apenas R$ 49,90! Hoje aberto até 21:30!',
          discount: '50% OFF',
          icon: '🔥',
          bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
          textColor: 'text-white'
        },
        1: { // Segunda
          title: 'SEGUNDA-FEIRA COM DESCONTO! 🍤',
          description: 'Mini Sushi Dog Tilápia por apenas R$ 9,99! Hoje aberto até 21:30!',
          discount: '33% OFF',
          icon: '⚡',
          bgColor: 'bg-gradient-to-r from-blue-500 to-purple-500',
          textColor: 'text-white'
        },
        2: { // Terça
          title: 'TERÇA É DIA DE HOT BARATO! 🌯',
          description: '1 Hot por R$ 1,00! Máximo 20 unidades! Hoje aberto até 21:30!',
          discount: '50% OFF',
          icon: '💥',
          bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
          textColor: 'text-white'
        },
        3: { // Quarta
          title: 'QUARTA DO COMBO CASAL! 👫',
          description: 'Sushidogroll Casal Tilápia + 2 Pepsi por R$ 39,90! Hoje aberto até 21:30!',
          discount: '20% OFF',
          icon: '💕',
          bgColor: 'bg-gradient-to-r from-pink-500 to-rose-500',
          textColor: 'text-white'
        },
        4: { // Quinta
          title: 'QUINTA DO SALMÃO! 🐟',
          description: 'Sushidogroll Salmão + Bebida por apenas R$ 24,99! Hoje aberto até 21:30!',
          discount: '17% OFF',
          icon: '🐟',
          bgColor: 'bg-gradient-to-r from-orange-500 to-red-500',
          textColor: 'text-white'
        },
        5: { // Sexta
          title: 'SEXTA É DIA DE FESTA! 🎉',
          description: 'Mini Sushi Dog Salmão por apenas R$ 14,99! Hoje aberto até 21:30!',
          discount: '25% OFF',
          icon: '🎊',
          bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
          textColor: 'text-white'
        },
        6: { // Sábado
          title: 'SÁBADO É DIA DE MEGA PROMOÇÃO! 🍣',
          description: 'Sushidogroll Casal Salmão (2 unidades) por apenas R$ 49,90! Hoje aberto até 21:30!',
          discount: '50% OFF',
          icon: '🔥',
          bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
          textColor: 'text-white'
        }
      }

      const todayPromo = promos[dayOfWeek as keyof typeof promos]
      setPromoData(todayPromo)
      
      // Sempre mostra a promoção
      setIsVisible(true)
    }

    checkPromo()
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    const todayString = new Date().toDateString()
    localStorage.setItem('dailyPromoClosed', todayString)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`relative ${promoData.bgColor} ${promoData.textColor} rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-500 scale-100`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="text-6xl mb-4 animate-bounce">
            {promoData.icon}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3 leading-tight">
            {promoData.title}
          </h2>

          {/* Description */}
          <p className="text-lg mb-4 opacity-90">
            {promoData.description}
          </p>

          {/* Discount Badge */}
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-xl">{promoData.discount}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Ver Cardápio Completo
            </button>
            <p className="text-sm opacity-75">
              Válido apenas para hoje! ⏰
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 -right-2 w-6 h-6 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  )
}
