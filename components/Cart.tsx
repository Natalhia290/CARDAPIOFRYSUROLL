'use client'

import { useState } from 'react'
import { X, Plus, Minus, Trash2, Phone } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'
import SushiGame from './SushiGame'

export default function Cart() {
  const {
    state,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCart()

  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [showGame, setShowGame] = useState(false)

  const generateWhatsAppMessage = () => {
    const items = state.items.map(item => 
      `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n')

    const message = `🍣 *PEDIDO FRYSUROLL* 🍣

*Cliente:* ${customerName}
*Endereço:* ${customerAddress}
*Telefone:* ${customerPhone}

*ITENS:*
${items}

*Subtotal:* ${formatPrice(getTotalPrice())}
*Taxa de entrega:* Será calculada pela loja

_Pedido feito pelo site FrySuRoll_`

    return encodeURIComponent(message)
  }

  const sendToWhatsApp = () => {
    if (state.items.length === 0) return

    const total = getTotalPrice()

    // Validação dos campos obrigatórios
    if (!customerName.trim() || !customerAddress.trim() || !customerPhone.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios: Nome, Endereço e Telefone.')
      return
    }

    if (total < 50) {
      alert(`Pedido mínimo de R$ 50,00. Seu pedido atual é de ${formatPrice(total)}. Adicione mais itens para continuar!`)
      return
    }

    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/5562995045038?text=${message}`
    window.open(whatsappUrl, '_blank')

    // Mostrar o jogo após enviar o pedido
    setShowGame(true)
    clearCart()
  }

  if (showGame) {
    return <SushiGame onClose={() => setShowGame(false)} />
  }

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform animate-slideUp flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Seu Carrinho</h2>
                <p className="text-red-100 text-sm">{state.items.length} item(s)</p>
              </div>
            </div>
            <button
              onClick={toggleCart}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Carrinho vazio</h3>
              <p className="text-gray-500">Adicione alguns itens deliciosos!</p>
            </div>
          ) : (
            <>
              {state.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{formatPrice(item.price)} cada</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-red-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({item.quantity}x)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-300 hover:scale-110 text-red-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-lg font-bold text-gray-800 bg-white rounded-lg py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          // Limitar hot por 1 real a 40 unidades
                          if (item.id === 'hot-1-real' && item.quantity >= 40) {
                            alert('Máximo de 40 unidades do hot por 1 real!')
                            return
                          }
                          updateQuantity(item.id, item.quantity + 1)
                        }}
                        className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-all duration-300 hover:scale-110 text-green-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </>
          )}
        </div>

        {/* Customer Info - Fixed Section */}
        {state.items.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📝</span>
                </div>
                <h3 className="font-bold text-gray-800">Dados para entrega</h3>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                  required
                />
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Endereço completo com bairro"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                  required
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Telefone/WhatsApp (62) 99999-9999"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 space-y-4 flex-shrink-0">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxa de entrega:</span>
                <span>Será calculada pela loja</span>
              </div>
              {getTotalPrice() < 50 && (
                <div className="flex justify-between text-sm text-orange-600 font-medium bg-orange-50 p-2 rounded-lg">
                  <span>Pedido mínimo:</span>
                  <span>R$ 50,00</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span className={getTotalPrice() < 50 ? 'text-orange-600' : 'text-green-600'}>
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
              {getTotalPrice() < 50 && (
                <div className="text-center text-sm text-orange-600 bg-orange-100 p-3 rounded-lg">
                  <span className="font-semibold">Faltam {formatPrice(50 - getTotalPrice())} para o pedido mínimo</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar</span>
              </button>
              <button
                onClick={sendToWhatsApp}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 ${
                  getTotalPrice() < 50 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/25'
                }`}
              >
                <Phone className="w-5 h-5" />
                <span>
                  {getTotalPrice() < 50 ? 'Pedido Mínimo R$ 50' : 'Pedir no WhatsApp'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}