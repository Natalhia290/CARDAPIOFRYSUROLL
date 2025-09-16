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
            <section className="relative japanese-bg text-white py-32 overflow-hidden floating-particles">
              {/* Japanese Background Elements */}
              <div className="absolute inset-0 japanese-pattern opacity-30"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 via-transparent to-amber-500/20"></div>
              
              {/* Floating Japanese Elements */}
              <div className="absolute top-20 left-10 w-8 h-8 bg-red-400 rounded-full japanese-pulse shadow-lg"></div>
              <div className="absolute top-40 right-20 w-10 h-10 bg-amber-400 rounded-full japanese-float shadow-lg"></div>
              <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-red-300 rounded-full japanese-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-amber-300 rounded-full japanese-float shadow-lg" style={{animationDelay: '2s'}}></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-10 left-1/4 text-6xl opacity-20 japanese-float">🍣</div>
              <div className="absolute top-20 right-1/4 text-5xl opacity-20 japanese-float" style={{animationDelay: '1s'}}>🍤</div>
              <div className="absolute bottom-20 left-1/3 text-4xl opacity-20 japanese-float" style={{animationDelay: '2s'}}>🥢</div>
              <div className="absolute bottom-10 right-1/3 text-5xl opacity-20 japanese-float" style={{animationDelay: '3s'}}>🌸</div>
              
              {/* Sushis Animados */}
              <AnimatedSushi />
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="mb-12 torii-gate">
                    <h1 className="text-7xl md:text-9xl font-black mb-8 japanese-text tracking-tight drop-shadow-2xl">
                      FRYSUROLL
                    </h1>
                    <div className="w-60 h-3 bg-gradient-to-r from-red-400 via-amber-400 to-red-400 mx-auto rounded-full shadow-2xl"></div>
                  </div>
                  
                  <p className="text-4xl md:text-5xl mb-10 text-red-100 font-light drop-shadow-lg">
                    <span className="japanese-text font-bold">AUTENTICIDADE</span> meets <span className="text-amber-300 font-bold">INOVAÇÃO</span>
                  </p>
                  
                  <p className="text-2xl md:text-3xl mb-16 text-red-200 font-medium max-w-5xl mx-auto leading-relaxed drop-shadow-lg">
                    🍤 <span className="japanese-text font-bold">Especialistas em Hot Rolls e Sushidogrolls</span> 🍤<br/>
                    <span className="text-xl text-red-300">A tradição japonesa reinventada em Goiânia</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-10 justify-center items-center mb-20">
                    <div className="japanese-card px-10 py-8 japanese-glow-hover shadow-2xl">
                      <div className="flex items-center space-x-5">
                        <MapPin className="w-8 h-8 text-red-500" />
                        <span className="font-bold text-xl">Entrega em toda Goiânia</span>
                      </div>
                    </div>
                    <div className="japanese-card px-10 py-8 japanese-glow-hover shadow-2xl">
                      <div className="flex items-center space-x-5">
                        <Clock className="w-8 h-8 text-amber-500" />
                        <span className="font-bold text-xl">Entrega rápida</span>
                      </div>
                    </div>
                    <div className="japanese-card px-10 py-8 japanese-glow-hover shadow-2xl">
                      <div className="flex items-center space-x-5">
                        <Star className="w-8 h-8 text-yellow-500" />
                        <span className="font-bold text-xl">Qualidade premium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-8 justify-center">
                    <button className="btn-primary text-2xl px-12 py-6 japanese-glow-hover shadow-2xl">
                      🍣 FAZER PEDIDO AGORA
                    </button>
                    <button className="btn-secondary text-2xl px-12 py-6 japanese-glow-hover shadow-2xl">
                      📋 VER CARDÁPIO
                    </button>
                  </div>
                </div>
              </div>
            </section>

      {/* Speciality Section */}
      <section className="sushi-bg py-32 relative overflow-hidden floating-particles">
        <div className="absolute inset-0 bamboo-forest opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 via-transparent to-amber-500/10"></div>
        
        {/* Decorative Sushi Elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 japanese-float">🍣</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 japanese-float" style={{animationDelay: '1s'}}>🍤</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 japanese-float" style={{animationDelay: '2s'}}>🥢</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 japanese-float" style={{animationDelay: '3s'}}>🌸</div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-7xl font-black mb-10 japanese-text drop-shadow-lg">
              🍤 NOSSA ESPECIALIDADE: SUSHI FRITO! 🍤
            </h2>
            <div className="japanese-divider"></div>
            <p className="text-3xl text-gray-800 max-w-6xl mx-auto leading-relaxed drop-shadow-sm">
              Somos <span className="japanese-text font-bold">especialistas em sushi frito</span>! Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia, 
              com aquele <span className="text-amber-600 font-bold">crocante perfeito</span> que só nós sabemos fazer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl">
              <div className="text-9xl mb-10 japanese-float">🍤</div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Hot Rolls Crocantes</h3>
              <p className="text-gray-700 leading-relaxed text-xl">
                Sushi frito com <span className="text-red-600 font-semibold">textura única</span> e sabor incomparável
              </p>
              <div className="mt-10 w-full h-3 bg-gradient-to-r from-red-400 to-amber-400 rounded-full shadow-lg"></div>
            </div>
            
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl" style={{animationDelay: '0.5s'}}>
              <div className="text-9xl mb-10 japanese-float">🌯</div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Sushidogrolls Únicos</h3>
              <p className="text-gray-700 leading-relaxed text-xl">
                Nossa <span className="text-amber-600 font-semibold">criação exclusiva</span> que conquistou Goiânia
              </p>
              <div className="mt-10 w-full h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg"></div>
            </div>
            
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl" style={{animationDelay: '1s'}}>
              <div className="text-9xl mb-10 japanese-float">🔥</div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Técnica Especial</h3>
              <p className="text-gray-700 leading-relaxed text-xl">
                Fritura perfeita que mantém o <span className="text-red-600 font-semibold">sabor e crocância</span>
              </p>
              <div className="mt-10 w-full h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="japanese-pattern py-24 relative overflow-hidden floating-particles">
        <div className="absolute inset-0 japanese-texture opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 via-transparent to-amber-500/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 japanese-float">🚚</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 japanese-float" style={{animationDelay: '1s'}}>📱</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 japanese-float" style={{animationDelay: '2s'}}>⏰</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 japanese-float" style={{animationDelay: '3s'}}>🎯</div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-8 japanese-text drop-shadow-lg">
              🚚 ENTREGA PREMIUM
            </h2>
            <div className="japanese-divider"></div>
            <p className="text-3xl text-red-100 drop-shadow-sm">
              A tradição japonesa chega até você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-10 japanese-pulse shadow-lg">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Entrega Rápida</h3>
              <p className="text-red-100 leading-relaxed text-xl">
                Entregamos em <span className="text-red-300 font-semibold">toda Goiânia</span> com rapidez e qualidade premium
              </p>
            </div>
            
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-10 japanese-pulse shadow-lg" style={{animationDelay: '0.5s'}}>
                <span className="text-4xl font-bold">🚚</span>
              </div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Taxa Inteligente</h3>
              <p className="text-red-100 leading-relaxed text-xl">
                <span className="text-amber-300 font-semibold">R$ 10,00</span> apenas para distâncias acima de 9 km
              </p>
            </div>
            
            <div className="japanese-card p-12 text-center japanese-glow-hover group shadow-2xl">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 japanese-pulse shadow-lg" style={{animationDelay: '1s'}}>
                <Phone className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-8 japanese-text">Pedido Digital</h3>
              <p className="text-red-100 leading-relaxed text-xl">
                Faça seu pedido direto pelo <span className="text-green-300 font-semibold">WhatsApp: (62) 99504-5038</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="cherry-blossom py-24 relative overflow-hidden floating-particles">
        <div className="absolute inset-0 japanese-texture opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 japanese-float">🍽️</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 japanese-float" style={{animationDelay: '1s'}}>📱</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 japanese-float" style={{animationDelay: '2s'}}>🎉</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 japanese-float" style={{animationDelay: '3s'}}>💫</div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl font-black mb-10 text-gray-800 drop-shadow-lg">
            🍽️ TAMBÉM ESTAMOS NO <span className="japanese-text">IFOOD</span>!
          </h2>
          <div className="japanese-divider"></div>
          <p className="text-3xl text-gray-700 mb-12 max-w-4xl mx-auto drop-shadow-sm">
            Peça também pelo iFood e aproveite as <span className="text-amber-600 font-bold">promoções exclusivas</span> da plataforma
          </p>
          
          <a
            href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-8 bg-gradient-to-r from-orange-500 to-red-600 text-white px-16 py-10 rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 japanese-glow-hover"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <img 
                src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
                alt="iFood Logo" 
                className="w-12 h-12"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    `
                  }
                }}
              />
            </div>
            <div className="text-left">
              <div className="font-black text-4xl">PEDIR NO IFOOD</div>
              <div className="text-xl opacity-90 font-semibold">Aproveite as promoções!</div>
            </div>
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="sushi-bg py-32 relative overflow-hidden floating-particles">
        <div className="absolute inset-0 cherry-blossom opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 via-transparent to-amber-500/10"></div>
        
        {/* Decorative Sushi Elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 japanese-float">🍣</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20 japanese-float" style={{animationDelay: '1s'}}>🍤</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 japanese-float" style={{animationDelay: '2s'}}>🥢</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 japanese-float" style={{animationDelay: '3s'}}>🌸</div>
        <div className="absolute top-1/2 left-10 text-3xl opacity-20 japanese-float" style={{animationDelay: '4s'}}>🍱</div>
        <div className="absolute top-1/3 right-10 text-4xl opacity-20 japanese-float" style={{animationDelay: '5s'}}>🍙</div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-8xl font-black mb-10 japanese-text drop-shadow-lg">
              🍣 NOSSO CARDÁPIO
            </h2>
            <div className="japanese-divider"></div>
            <p className="text-4xl text-gray-800 mb-8 drop-shadow-sm">
              Especialistas em <span className="japanese-text font-bold">sushi frito</span> com os melhores ingredientes
            </p>
            <p className="text-3xl font-bold text-amber-600 drop-shadow-sm">
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
