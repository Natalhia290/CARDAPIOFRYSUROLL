'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useIfoodSync } from '@/hooks/useIfoodSync'
import { formatPrice } from '@/utils/formatPrice'
import ProductImage from './ProductImage'
import { Product } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart()
  const { getPrice, isOpen } = useIfoodSync()
  const [isAdding, setIsAdding] = useState(false)

  // Usar preço sincronizado do iFood ou preço padrão
  const syncedPrice = getPrice(product.id)
  const displayPrice = syncedPrice || product.price
  const isPriceSynced = syncedPrice !== null

  const handleAddToCart = async () => {
    if (!isOpen) {
      alert('Nossa loja está fechada no momento. Você ainda pode fazer pedidos pelo WhatsApp!')
      return
    }

    setIsAdding(true)
    
    // Criar produto com preço sincronizado
    const productWithSyncedPrice = {
      ...product,
      price: displayPrice
    }
    
    addItem(productWithSyncedPrice)
    
    // Feedback visual
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div 
      className="card overflow-hidden card-hover fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <ProductImage
        src={product.image || '/images/products/placeholder.jpg'}
        alt={product.name}
        className="product-image"
        category={product.category}
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col items-end space-y-1">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -{product.discount}%
              </span>
            )}
            {(product.category.includes('Hot') || product.category.includes('Sushidogroll')) && (
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
                🍤 FRITO
              </span>
            )}
            {isPriceSynced && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                📱 iFood
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(displayPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full btn-primary flex items-center justify-center space-x-2 bounce-in hover:scale-105 transition-transform ${
            !isOpen ? 'opacity-50 cursor-not-allowed' : ''
          } ${isAdding ? 'animate-pulse' : ''}`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {isAdding ? 'Adicionando...' : !isOpen ? 'Loja Fechada' : 'Adicionar ao Carrinho'}
          </span>
        </button>

        {/* Indicador de preço sincronizado */}
        {isPriceSynced && (
          <div className="mt-2 text-xs text-green-600 text-center">
            ✓ Preço atualizado do iFood
          </div>
        )}
      </div>
    </div>
  )
}
