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
*Taxa de entrega:* Será calculada no WhatsApp

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

    if (total < 30) {
      alert(`Pedido mínimo de R$ 30,00. Seu pedido atual é de ${formatPrice(total)}. Adicione mais itens para continuar!`)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Carrinho</h2>
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[70vh]">
          {state.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Dados para entrega</h3>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu nome"
                  className="input-field"
                />
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Endereço completo"
                  className="input-field"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Telefone/WhatsApp"
                  className="input-field"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-3 sticky bottom-0 bg-white">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxa de entrega:</span>
              <span>Será calculada no WhatsApp</span>
            </div>
            {getTotalPrice() < 30 && (
              <div className="flex justify-between text-sm text-orange-600 font-medium">
                <span>Pedido mínimo:</span>
                <span>R$ 30,00</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal:</span>
              <span className={getTotalPrice() < 30 ? 'text-orange-600' : 'text-gray-900'}>
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            {getTotalPrice() < 30 && (
              <div className="text-xs text-orange-600 text-center">
                Faltam {formatPrice(30 - getTotalPrice())} para o pedido mínimo
              </div>
            )}
            
            <div className="flex space-x-2">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={sendToWhatsApp}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  getTotalPrice() < 30 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>
                  {getTotalPrice() < 30 ? 'Pedido Mínimo R$ 30' : 'Pedir no WhatsApp'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}