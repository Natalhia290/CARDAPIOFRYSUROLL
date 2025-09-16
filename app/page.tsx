'use client'

import { useState } from 'react'
import { ShoppingCart, MapPin, Clock, Star, Phone } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { formatPrice } from '@/utils/formatPrice'
import ProductImage from '@/components/ProductImage'
import AnimatedSushi from '@/components/AnimatedSushi'
import DailyPromo from '@/components/DailyPromo'
import VideoGallery from '@/components/VideoGallery'
import StoreClosedPopup from '@/components/StoreClosedPopup'

export default function Home() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = ['Todos', ...new Set(products.map(p => p.category))]
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Store Closed Popup */}
      <StoreClosedPopup />
      
      {/* Daily Promo Popup */}
      <DailyPromo />
      
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white py-24 overflow-hidden japanese-grid">
              {/* Japanese Background Elements */}
              <div className="absolute inset-0 sakura-fall"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 via-transparent to-amber-500/10"></div>
              
              {/* Floating Japanese Elements */}
              <div className="absolute top-20 left-10 w-6 h-6 bg-red-400 rounded-full japanese-pulse"></div>
              <div className="absolute top-40 right-20 w-8 h-8 bg-amber-400 rounded-full japanese-float"></div>
              <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-red-300 rounded-full japanese-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-40 right-1/3 w-6 h-6 bg-amber-300 rounded-full japanese-float" style={{animationDelay: '2s'}}></div>
              
              {/* Sushis Animados */}
              <AnimatedSushi />
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 japanese-text tracking-tight">
                      FRYSUROLL
                    </h1>
                    <div className="w-40 h-2 bg-gradient-to-r from-red-400 to-amber-400 mx-auto rounded-full shadow-lg"></div>
                  </div>
                  
                  <p className="text-3xl md:text-4xl mb-8 text-red-100 font-light">
                    <span className="japanese-text font-bold">AUTENTICIDADE</span> meets <span className="text-amber-300 font-bold">INOVAÇÃO</span>
                  </p>
                  
                  <p className="text-xl md:text-2xl mb-12 text-red-200 font-medium max-w-4xl mx-auto leading-relaxed">
                    🍤 <span className="japanese-text font-bold">Especialistas em Hot Rolls e Sushidogrolls</span> 🍤<br/>
                    <span className="text-lg text-red-300">A tradição japonesa reinventada em Goiânia</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
                    <div className="japanese-card px-8 py-6 japanese-glow-hover">
                      <div className="flex items-center space-x-4">
                        <MapPin className="w-7 h-7 text-red-500" />
                        <span className="font-bold text-lg">Entrega em toda Goiânia</span>
                      </div>
                    </div>
                    <div className="japanese-card px-8 py-6 japanese-glow-hover">
                      <div className="flex items-center space-x-4">
                        <Clock className="w-7 h-7 text-amber-500" />
                        <span className="font-bold text-lg">Entrega rápida</span>
                      </div>
                    </div>
                    <div className="japanese-card px-8 py-6 japanese-glow-hover">
                      <div className="flex items-center space-x-4">
                        <Star className="w-7 h-7 text-yellow-500" />
                        <span className="font-bold text-lg">Qualidade premium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="btn-primary text-xl px-10 py-5 japanese-glow-hover">
                      🍣 FAZER PEDIDO AGORA
                    </button>
                    <button className="btn-secondary text-xl px-10 py-5 japanese-glow-hover">
                      📋 VER CARDÁPIO
                    </button>
                  </div>
                </div>
              </div>
            </section>

      {/* Speciality Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-amber-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bamboo-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-8 japanese-text">
              🍤 NOSSA ESPECIALIDADE: SUSHI FRITO! 🍤
            </h2>
            <p className="text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              Somos <span className="japanese-text font-bold">especialistas em sushi frito</span>! Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia, 
              com aquele <span className="text-amber-600 font-bold">crocante perfeito</span> que só nós sabemos fazer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="japanese-card p-10 text-center japanese-glow-hover group">
              <div className="text-8xl mb-8 japanese-float">🍤</div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Hot Rolls Crocantes</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sushi frito com <span className="text-red-600 font-semibold">textura única</span> e sabor incomparável
              </p>
              <div className="mt-8 w-full h-2 bg-gradient-to-r from-red-400 to-amber-400 rounded-full"></div>
            </div>
            
            <div className="japanese-card p-10 text-center japanese-glow-hover group" style={{animationDelay: '0.5s'}}>
              <div className="text-8xl mb-8 japanese-float">🌯</div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Sushidogrolls Únicos</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nossa <span className="text-amber-600 font-semibold">criação exclusiva</span> que conquistou Goiânia
              </p>
              <div className="mt-8 w-full h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
            </div>
            
            <div className="japanese-card p-10 text-center japanese-glow-hover group" style={{animationDelay: '1s'}}>
              <div className="text-8xl mb-8 japanese-float">🔥</div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Técnica Especial</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Fritura perfeita que mantém o <span className="text-red-600 font-semibold">sabor e crocância</span>
              </p>
              <div className="mt-8 w-full h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 japanese-grid opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 via-transparent to-amber-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 japanese-text">
              🚚 ENTREGA PREMIUM
            </h2>
            <p className="text-2xl text-red-100">
              A tradição japonesa chega até você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="japanese-card p-10 text-center japanese-glow-hover group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 japanese-pulse">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Entrega Rápida</h3>
              <p className="text-red-100 leading-relaxed text-lg">
                Entregamos em <span className="text-red-300 font-semibold">toda Goiânia</span> com rapidez e qualidade premium
              </p>
            </div>
            
            <div className="japanese-card p-10 text-center japanese-glow-hover group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 japanese-pulse" style={{animationDelay: '0.5s'}}>
                <span className="text-3xl font-bold">🚚</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Taxa Inteligente</h3>
              <p className="text-red-100 leading-relaxed text-lg">
                <span className="text-amber-300 font-semibold">R$ 10,00</span> apenas para distâncias acima de 9 km
              </p>
            </div>
            
            <div className="japanese-card p-10 text-center japanese-glow-hover group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 japanese-pulse" style={{animationDelay: '1s'}}>
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 japanese-text">Pedido Digital</h3>
              <p className="text-red-100 leading-relaxed text-lg">
                Faça seu pedido direto pelo <span className="text-green-300 font-semibold">WhatsApp: (62) 99504-5038</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 wave-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black mb-8 text-white">
            🍽️ TAMBÉM ESTAMOS NO <span className="japanese-text">IFOOD</span>!
          </h2>
          <p className="text-2xl text-orange-100 mb-10 max-w-3xl mx-auto">
            Peça também pelo iFood e aproveite as <span className="text-yellow-300 font-bold">promoções exclusivas</span> da plataforma
          </p>
          
          <a
            href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-6 bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-8 rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 japanese-glow-hover"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <img 
                src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
                alt="iFood Logo" 
                className="w-10 h-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    `
                  }
                }}
              />
            </div>
            <div className="text-left">
              <div className="font-black text-3xl">PEDIR NO IFOOD</div>
              <div className="text-lg opacity-90 font-semibold">Aproveite as promoções!</div>
            </div>
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 sakura-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-black mb-8 japanese-text">
              🍣 NOSSO CARDÁPIO
            </h2>
            <p className="text-3xl text-gray-700 mb-6">
              Especialistas em <span className="japanese-text font-bold">sushi frito</span> com os melhores ingredientes
            </p>
            <p className="text-2xl font-bold text-amber-600">
              🍤 Hot Rolls, Sushidogrolls e muito mais! 🍤
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                    : 'bg-white/80 text-gray-700 hover:bg-red-50 hover:text-red-700 border-2 border-red-200 hover:border-red-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="japanese-card overflow-hidden card-hover japanese-glow-hover fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <ProductImage
                    src={product.image || '/images/products/placeholder.jpg'}
                    alt={product.name}
                    className="product-image group-hover:scale-110 transition-transform duration-500"
                    category={product.category}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-2xl text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end space-y-3">
                      {product.discount && (
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                          -{product.discount}%
                        </span>
                      )}
                      {(product.category.includes('Hot') || product.category.includes('Sushidogroll')) && (
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                          🍤 FRITO
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-base mb-8 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl font-black japanese-text">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addItem(product)}
                    className="w-full btn-primary flex items-center justify-center space-x-4 py-5 text-xl font-bold japanese-glow-hover"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Vídeos */}
      <VideoGallery 
        videos={[
          "/videos/hero-video-1.mp4",
          "/videos/hero-video-2.mp4", 
          "/videos/hero-video-3.mp4"
        ]}
        title="🍣 Nossos Vídeos"
        description="Veja como preparamos nossos deliciosos sushis fritos com todo carinho e qualidade"
      />
    </div>
  )
}
