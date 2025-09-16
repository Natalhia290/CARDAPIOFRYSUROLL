'use client'

import { useState } from 'react'
import { MapPin, Clock, Star, Phone, ShoppingCart, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'
import StoreStatus from '@/components/StoreStatus'
import DailyPromo from '@/components/DailyPromo'
import StoreClosedPopup from '@/components/StoreClosedPopup'
import AnimatedSushi from '@/components/AnimatedSushi'

const categories = [
  { id: 'all', name: 'Todos os Produtos', icon: '🍽️' },
  { id: 'hot-rolls', name: 'Hot Rolls', icon: '🍤' },
  { id: 'sushidogrolls', name: 'Sushidogrolls', icon: '🌯' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'promocoes', name: 'Promoções', icon: '🎉' }
]

export default function Home() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'promocoes') return product.discount && product.discount > 0
    return product.category === selectedCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Status */}
      <StoreStatus />
      
      {/* Popups */}
      <StoreClosedPopup />
      <DailyPromo />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-modern text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-modern section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="text-6xl md:text-8xl font-black mb-6 text-gradient">
                FRYSUROLL
              </h1>
              <div className="divider mb-8"></div>
              <p className="text-2xl md:text-3xl mb-8 font-light">
                Especialistas em <span className="text-accent font-bold">Sushi Frito</span>
              </p>
              <p className="text-lg md:text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
                A tradição japonesa reinventada em Goiânia com Hot Rolls e Sushidogrolls únicos
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="btn-primary text-lg px-8 py-4">
                🍣 Fazer Pedido Agora
              </button>
              <button className="btn-outline text-lg px-8 py-4">
                📋 Ver Cardápio
              </button>
            </div>
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card-glass p-6 text-center hover-lift">
                <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Entrega em Goiânia</h3>
                <p className="text-sm text-blue-100">Toda a cidade</p>
              </div>
              <div className="card-glass p-6 text-center hover-lift">
                <Clock className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Entrega Rápida</h3>
                <p className="text-sm text-blue-100">30-45 minutos</p>
              </div>
              <div className="card-glass p-6 text-center hover-lift">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Qualidade Premium</h3>
                <p className="text-sm text-blue-100">Ingredientes frescos</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Sushi */}
        <AnimatedSushi />
      </section>

      {/* Speciality Section */}
      <section className="bg-gradient-neutral section-padding">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-gradient">
              Nossa Especialidade
            </h2>
            <div className="divider mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em <span className="text-accent font-bold">sushi frito</span>! 
              Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center hover-lift">
              <div className="text-6xl mb-6 sushi-float">🍤</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Hot Rolls Crocantes</h3>
              <p className="text-gray-600 leading-relaxed">
                Sushi frito com textura única e sabor incomparável
              </p>
            </div>
            
            <div className="card-elevated p-8 text-center hover-lift">
              <div className="text-6xl mb-6 sushi-float" style={{animationDelay: '1s'}}>🌯</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Sushidogrolls Únicos</h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa criação exclusiva que conquistou Goiânia
              </p>
            </div>
            
            <div className="card-elevated p-8 text-center hover-lift">
              <div className="text-6xl mb-6 sushi-float" style={{animationDelay: '2s'}}>🔥</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Técnica Especial</h3>
              <p className="text-gray-600 leading-relaxed">
                Fritura perfeita que mantém o sabor e crocância
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-gradient-cool text-white section-padding">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Entrega Premium
            </h2>
            <div className="divider mb-8"></div>
            <p className="text-xl text-blue-100">
              A tradição japonesa chega até você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass p-8 text-center hover-lift">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Entrega Rápida</h3>
              <p className="text-blue-100">
                Entregamos em <span className="font-bold">toda Goiânia</span> com rapidez e qualidade
              </p>
            </div>
            
            <div className="card-glass p-8 text-center hover-lift">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Taxa Inteligente</h3>
              <p className="text-blue-100">
                <span className="font-bold">R$ 10,00</span> apenas para distâncias acima de 9 km
              </p>
            </div>
            
            <div className="card-glass p-8 text-center hover-lift">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pedido Digital</h3>
              <p className="text-blue-100">
                Faça seu pedido pelo <span className="font-bold">WhatsApp: (62) 99504-5038</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="bg-gradient-warm text-white section-padding">
        <div className="container-modern text-center">
          <h2 className="text-5xl font-black mb-6">
            Também estamos no iFood!
          </h2>
          <div className="divider mb-8"></div>
          <p className="text-xl text-pink-100 mb-12 max-w-3xl mx-auto">
            Peça também pelo iFood e aproveite as <span className="font-bold">promoções exclusivas</span> da plataforma
          </p>
          
          <a
            href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 bg-white text-pink-600 px-8 py-4 rounded-xl font-bold hover:bg-pink-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <img 
              src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
              alt="iFood Logo" 
              className="w-8 h-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            <span>Pedir no iFood</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-gradient-neutral section-padding">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-gradient">
              Nosso Cardápio
            </h2>
            <div className="divider mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialistas em <span className="text-accent font-bold">sushi frito</span> com os melhores ingredientes
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="card hover-lift fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <Image
                    src={product.image || '/images/placeholder.jpg'}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="product-image"
                  />
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      PROMOÇÃO
                    </div>
                  )}
                  {product.category === 'hot-rolls' && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      NOVO
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    {product.category === 'hot-rolls' && (
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        FRITO
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => addItem(product)}
                    className="btn-primary w-full text-center"
                  >
                    Adicionar ao Carrinho
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