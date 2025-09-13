'use client'

import { useState } from 'react'
import { ShoppingCart, MapPin, Clock, Star, Phone } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { formatPrice } from '@/utils/formatPrice'
import ProductImage from '@/components/ProductImage'
import AnimatedSushi from '@/components/AnimatedSushi'
import DailyPromo from '@/components/DailyPromo'

export default function Home() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = ['Todos', ...new Set(products.map(p => p.category))]
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Daily Promo Popup */}
      <DailyPromo />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 overflow-hidden">
        {/* Sushis Animados */}
        <AnimatedSushi />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              FrySuRoll
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-100">
              O melhor delivery de sushi frito de Goiânia
            </p>
            <p className="text-lg md:text-xl mb-8 text-primary-200 font-semibold">
              🍤 Especialistas em Hot Rolls e Sushidogrolls 🍤
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <span>Entrega em toda Goiânia</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Star className="w-5 h-5" />
                <span>Qualidade garantida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speciality Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🍤 Nossa Especialidade: Sushi Frito! 🍤</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em sushi frito! Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia, 
              com aquele crocante perfeito que só nós sabemos fazer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500 float-slow">
              <div className="text-4xl mb-3">🍤</div>
              <h3 className="font-semibold text-lg mb-2">Hot Rolls Crocantes</h3>
              <p className="text-gray-600">Sushi frito com textura única e sabor incomparável</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500 float-slow" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl mb-3">🌯</div>
              <h3 className="font-semibold text-lg mb-2">Sushidogrolls Únicos</h3>
              <p className="text-gray-600">Nossa criação exclusiva que conquistou Goiânia</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500 float-slow" style={{ animationDelay: '1s' }}>
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-semibold text-lg mb-2">Técnica Especial</h3>
              <p className="text-gray-600">Fritura perfeita que mantém o sabor e crocância</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos em toda Goiânia com rapidez e qualidade</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-8 h-8 text-green-600 mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl font-bold">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Entrega gratuita para toda Goiânia</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Pedido pelo WhatsApp</h3>
              <p className="text-gray-600">Faça seu pedido direto pelo WhatsApp: (62) 99504-5038</p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Também estamos no iFood!
          </h2>
          <p className="text-gray-600 mb-6">
            Peça também pelo iFood e aproveite as promoções da plataforma
          </p>
          <a
            href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <img 
              src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
              alt="iFood Logo" 
              className="w-8 h-8"
              onError={(e) => {
                // Fallback para ícone SVG caso a imagem não carregue
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const svg = document.createElement('div')
                  svg.innerHTML = `
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  `
                  parent.insertBefore(svg.firstChild, target)
                }
              }}
            />
            <div className="text-left">
              <div className="font-bold text-lg">Pedir no iFood</div>
              <div className="text-sm opacity-90">Aproveite as promoções!</div>
            </div>
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nosso Cardápio</h2>
            <p className="text-gray-600 mb-2">Especialistas em sushi frito com os melhores ingredientes</p>
            <p className="text-lg font-semibold text-primary-600">🍤 Hot Rolls, Sushidogrolls e muito mais! 🍤</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
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
                    className="w-full btn-primary flex items-center justify-center space-x-2 bounce-in hover:scale-105 transition-transform"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar ao Carrinho</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
