'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products, categories } from '@/data/products'
import { formatPrice } from '@/utils/formatPrice'
import ProductImage from '@/components/ProductImage'

export default function Cardapio() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cardápio Completo</h1>
          <p className="text-gray-600 text-lg mb-2">Especialistas em sushi frito - todos os nossos pratos em um só lugar</p>
          <p className="text-lg font-semibold text-primary-600">🍤 Hot Rolls, Sushidogrolls e muito mais! 🍤</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products by Category */}
        {categories.map((category) => {
          const categoryProducts = products.filter(p => p.category === category)
          if (categoryProducts.length === 0) return null

          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary-600 pb-2">
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <div key={product.id} className="card hover:shadow-lg transition-shadow overflow-hidden">
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
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                              -{product.discount}%
                            </span>
                          )}
                          {(product.category.includes('Hot') || product.category.includes('Sushidogroll')) && (
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                              🍤 FRITO
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
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => addItem(product)}
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Adicionar ao Carrinho</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
