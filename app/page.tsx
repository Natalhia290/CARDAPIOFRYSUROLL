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
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden cyber-grid">
              {/* Tech Background Elements */}
              <div className="absolute inset-0 hologram"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
              
              {/* Floating Tech Elements */}
              <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full tech-pulse"></div>
              <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full tech-float"></div>
              <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400 rounded-full tech-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-blue-400 rounded-full tech-float" style={{animationDelay: '2s'}}></div>
              
              {/* Sushis Animados */}
              <AnimatedSushi />
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="mb-6">
                    <h1 className="text-6xl md:text-8xl font-black mb-4 neon-text tracking-tight">
                      FRYSUROLL
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                  </div>
                  
                  <p className="text-2xl md:text-3xl mb-6 text-gray-300 font-light">
                    <span className="neon-text font-bold">TECHNOLOGY</span> meets <span className="text-yellow-400 font-bold">SUSHI</span>
                  </p>
                  
                  <p className="text-lg md:text-xl mb-8 text-cyan-200 font-medium max-w-3xl mx-auto leading-relaxed">
                    🍤 <span className="neon-text font-bold">Especialistas em Hot Rolls e Sushidogrolls</span> 🍤<br/>
                    <span className="text-sm text-gray-400">O futuro do delivery de sushi frito em Goiânia</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                    <div className="tech-card px-6 py-4 tech-glow-hover">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-cyan-400" />
                        <span className="font-semibold">Entrega em toda Goiânia</span>
                      </div>
                    </div>
                    <div className="tech-card px-6 py-4 tech-glow-hover">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-6 h-6 text-purple-400" />
                        <span className="font-semibold">Entrega ultrarrápida</span>
                      </div>
                    </div>
                    <div className="tech-card px-6 py-4 tech-glow-hover">
                      <div className="flex items-center space-x-3">
                        <Star className="w-6 h-6 text-yellow-400" />
                        <span className="font-semibold">Qualidade premium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary text-lg px-8 py-4 tech-glow-hover">
                      🚀 FAZER PEDIDO AGORA
                    </button>
                    <button className="btn-secondary text-lg px-8 py-4 tech-glow-hover">
                      📱 VER CARDÁPIO
                    </button>
                  </div>
                </div>
              </div>
            </section>

      {/* Speciality Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 neon-text">
              🍤 NOSSA ESPECIALIDADE: SUSHI FRITO! 🍤
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Somos <span className="neon-text font-bold">especialistas em sushi frito</span>! Nossos Hot Rolls e Sushidogrolls são únicos em Goiânia, 
              com aquele <span className="text-yellow-400 font-bold">crocante perfeito</span> que só nós sabemos fazer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tech-card p-8 text-center tech-glow-hover group">
              <div className="text-6xl mb-6 tech-float">🍤</div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Hot Rolls Crocantes</h3>
              <p className="text-gray-300 leading-relaxed">
                Sushi frito com <span className="text-cyan-400 font-semibold">textura única</span> e sabor incomparável
              </p>
              <div className="mt-6 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
            
            <div className="tech-card p-8 text-center tech-glow-hover group" style={{animationDelay: '0.5s'}}>
              <div className="text-6xl mb-6 tech-float">🌯</div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Sushidogrolls Únicos</h3>
              <p className="text-gray-300 leading-relaxed">
                Nossa <span className="text-purple-400 font-semibold">criação exclusiva</span> que conquistou Goiânia
              </p>
              <div className="mt-6 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            </div>
            
            <div className="tech-card p-8 text-center tech-glow-hover group" style={{animationDelay: '1s'}}>
              <div className="text-6xl mb-6 tech-float">🔥</div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Técnica Especial</h3>
              <p className="text-gray-300 leading-relaxed">
                Fritura perfeita que mantém o <span className="text-yellow-400 font-semibold">sabor e crocância</span>
              </p>
              <div className="mt-6 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 neon-text">
              🚀 ENTREGA TECNOLÓGICA
            </h2>
            <p className="text-xl text-gray-300">
              O futuro do delivery chegou em Goiânia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="tech-card p-8 text-center tech-glow-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 tech-pulse">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Entrega Ultrarrápida</h3>
              <p className="text-gray-300 leading-relaxed">
                Entregamos em <span className="text-cyan-400 font-semibold">toda Goiânia</span> com rapidez e qualidade premium
              </p>
            </div>
            
            <div className="tech-card p-8 text-center tech-glow-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 tech-pulse" style={{animationDelay: '0.5s'}}>
                <span className="text-2xl font-bold">🚚</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Taxa Inteligente</h3>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-purple-400 font-semibold">R$ 10,00</span> apenas para distâncias acima de 9 km
              </p>
            </div>
            
            <div className="tech-card p-8 text-center tech-glow-hover group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 tech-pulse" style={{animationDelay: '1s'}}>
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-text">Pedido Digital</h3>
              <p className="text-gray-300 leading-relaxed">
                Faça seu pedido direto pelo <span className="text-green-400 font-semibold">WhatsApp: (62) 99504-5038</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* iFood Link */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6 text-white">
            🍽️ TAMBÉM ESTAMOS NO <span className="neon-text">IFOOD</span>!
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Peça também pelo iFood e aproveite as <span className="text-yellow-300 font-bold">promoções exclusivas</span> da plataforma
          </p>
          
          <a
            href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-6 rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 tech-glow-hover"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <img 
                src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
                alt="iFood Logo" 
                className="w-8 h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    `
                  }
                }}
              />
            </div>
            <div className="text-left">
              <div className="font-black text-2xl">PEDIR NO IFOOD</div>
              <div className="text-sm opacity-90 font-semibold">Aproveite as promoções!</div>
            </div>
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 neon-text">
              🍣 NOSSO CARDÁPIO
            </h2>
            <p className="text-2xl text-gray-300 mb-4">
              Especialistas em <span className="neon-text font-bold">sushi frito</span> com os melhores ingredientes
            </p>
            <p className="text-xl font-bold text-cyan-400">
              🍤 Hot Rolls, Sushidogrolls e muito mais! 🍤
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-white border border-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="tech-card overflow-hidden card-hover tech-glow-hover fade-in-up group"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-white line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end space-y-2">
                      {product.discount && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                          -{product.discount}%
                        </span>
                      )}
                      {(product.category.includes('Hot') || product.category.includes('Sushidogroll')) && (
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                          🍤 FRITO
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-black neon-text">
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
                    className="w-full btn-primary flex items-center justify-center space-x-3 py-4 text-lg font-bold tech-glow-hover"
                  >
                    <ShoppingCart className="w-5 h-5" />
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
