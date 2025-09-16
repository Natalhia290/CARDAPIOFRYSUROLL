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
    <div className="min-h-screen bg-white text-gray-900">

      {/* Store Status */}
      <StoreStatus />
      
      {/* Popups */}
      <StoreClosedPopup />
      <DailyPromo />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-50 to-red-100 text-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 py-20 flex items-center min-h-screen">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6 text-red-600">
                FRYSUROLL
              </h1>
              <div className="w-32 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
            </div>

            <p className="text-2xl md:text-4xl mb-6 font-bold text-gray-800">
              AUTENTICIDADE meets INOVAÇÃO
            </p>

            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-4xl mx-auto">
              🍤 <span className="font-bold">Especialistas em Hot Rolls e Sushidogrolls</span> 🍤<br/>
              <span className="text-gray-500">A tradição japonesa reinventada em Goiânia</span>
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Entrega em Goiânia</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Entrega rápida</h3>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Qualidade premium</h3>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cardapio" className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                🍣 FAZER PEDIDO AGORA
              </Link>
              <Link href="/cardapio" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-red-600 hover:bg-red-50 transition-colors flex items-center justify-center">
                📋 VER CARDÁPIO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Speciality Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-800">
              🍤 NOSSA ESPECIALIDADE: SUSHI FRITO! 🍤
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em sushi frito! Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia, com aquele crocante perfeito que só nós sabemos fazer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🍤</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Hot Rolls Crocantes</h3>
              <p className="text-gray-600">Sushi frito com textura única e sabor incomparável</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Sushidogrolls Únicos</h3>
              <p className="text-gray-600">Nossa criação exclusiva que conquistou Goiânia</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Técnica Especial</h3>
              <p className="text-gray-600">Fritura perfeita que mantém o sabor e crocância</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              🚚 ENTREGA PREMIUM
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              A tradição japonesa chega até você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Entrega Rápida</h3>
              <p className="text-red-100">Entregamos em Goiânia com rapidez e qualidade premium</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Taxa de Entrega</h3>
              <p className="text-red-100">Será calculada pela loja</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Pedido Digital</h3>
              <p className="text-red-100">Faça seu pedido direto pelo WhatsApp: (62) 99504-5038</p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="bg-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            🍽️ TAMBÉM ESTAMOS NO IFOOD!
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Peça também pelo iFood e aproveite as promoções exclusivas da plataforma
          </p>
          <a 
            href="https://www.ifood.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors inline-flex items-center"
          >
            <span className="mr-3">🍽️</span>
            <span>PEDIR NO IFOOD</span>
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-gradient">
              O que nossos clientes dizem
            </h2>
            <div className="divider mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mais de <span className="text-red-500 font-bold">100 clientes satisfeitos</span> em Goiânia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 fade-in-up">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                &ldquo;O melhor sushi frito de Goiânia! Os Hot Rolls são incríveis, crocantes por fora e macios por dentro. Entrega super rápida!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-white">Maria Silva</h4>
                  <p className="text-sm text-gray-400">Cliente há 2 anos</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                &ldquo;Os Sushidogrolls são uma obra de arte! Nunca comi nada igual. A qualidade dos ingredientes é excepcional.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-bold text-white">João Santos</h4>
                  <p className="text-sm text-gray-400">Cliente há 1 ano</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                &ldquo;Atendimento perfeito e comida deliciosa! Sempre peço pelo WhatsApp e chega rapidinho. Recomendo demais!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-white">Ana Costa</h4>
                  <p className="text-sm text-gray-400">Cliente há 6 meses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-black text-red-500 mb-2">100+</div>
              <div className="text-gray-300">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-amber-500 mb-2">4.9</div>
              <div className="text-gray-300">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-500 mb-2">40-60min</div>
              <div className="text-gray-300">Tempo de Entrega</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-modern">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-800">
              🍣 NOSSO CARDÁPIO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialistas em sushi frito com os melhores ingredientes
            </p>
            <p className="text-lg text-gray-500 mt-2">
              🍤 Hot Rolls, Sushidogrolls e muito mais! 🍤
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
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
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
              <div 
                key={product.id} 
                className="product-card group fade-in-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || '/images/placeholder.jpg'}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="product-image transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.discount && product.discount > 0 && (
                      <div className="product-badge pulse-glow">
                        -{product.discount}% OFF
                      </div>
                    )}
                    {product.category === 'hot-rolls' && (
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔥 FRITO
                      </div>
                    )}
                    {product.category === 'sushidogrolls' && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🌯 EXCLUSIVO
                      </div>
                    )}
                  </div>

                  {/* Quick Add Button (appears on hover) */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => addItem(product)}
                      className="bg-white text-red-600 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-red-50 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="product-price">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="product-original-price">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    
                    {/* Category Icon */}
                    <div className="text-2xl">
                      {product.category === 'hot-rolls' && '🍤'}
                      {product.category === 'sushidogrolls' && '🌯'}
                      {product.category === 'bebidas' && '🥤'}
                      {product.category === 'promocoes' && '🎉'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center space-x-2 group"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
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