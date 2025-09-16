'use client'

import { MapPin, Phone, Code, MessageCircle } from 'lucide-react'
import FooterGames from './FooterGames'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 japanese-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-amber-500/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Empresa */}
          <div>
            <h3 className="text-3xl font-black japanese-text mb-8">FRYSUROLL</h3>
            <p className="text-red-100 mb-8 leading-relaxed text-lg">
              <span className="text-red-300 font-bold">Especialistas em sushi frito!</span> O melhor delivery de Goiânia com Hot Rolls, Sushidogrolls e pratos únicos.
            </p>
            <div className="flex items-center space-x-4 text-red-200">
              <MapPin className="w-6 h-6" />
              <span className="font-semibold text-lg">Goiânia - GO</span>
            </div>
          </div>
          
          {/* Contato */}
            <div>
              <h4 className="text-2xl font-bold japanese-text mb-8">CONTATO</h4>
              <div className="space-y-6 text-red-100">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-amber-400" />
                  <span className="font-semibold text-lg">(62) 99504-5038</span>
                </div>
                <p className="text-red-300 font-semibold text-lg">WhatsApp: (62) 99504-5038</p>
                <div className="mt-6 p-6 bg-red-800/50 rounded-xl border border-red-500/20">
                  <p className="font-bold text-amber-400 mb-3 text-lg">Horário de Funcionamento:</p>
                  <p className="text-white font-semibold text-lg">18:00 às 23:59</p>
                </div>
              </div>
            </div>
          
          {/* Entrega */}
            <div>
              <h4 className="text-2xl font-bold japanese-text mb-8">ENTREGA</h4>
              <div className="text-red-100 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="font-semibold text-lg">Taxa de entrega: <span className="text-red-300">R$ 10,00</span> (acima de 9 km)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-semibold text-lg">Toda Goiânia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="font-semibold text-lg">Entrega rápida</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="font-semibold text-lg">Pedido mínimo: <span className="text-yellow-300">R$ 50,00</span></span>
                </div>
              </div>
            </div>

          {/* Desenvolvimento de Sites */}
          <div className="tech-card p-6 tech-glow-hover">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-6 h-6 text-cyan-400" />
              <h4 className="font-black text-xl neon-text">DESENVOLVIMENTO DE SITES</h4>
            </div>
            <p className="text-cyan-300 text-sm mb-3 font-semibold">
              💻 Precisa de um site igual a este? 
            </p>
            <p className="text-gray-300 text-sm mb-4">
              Sites modernos, responsivos e otimizados para vendas online!
            </p>
            <div className="flex items-center space-x-3 text-cyan-400">
              <MessageCircle className="w-5 h-5" />
              <a 
                href="https://wa.me/5562981841878?text=Olá! Vi o site do FrySuRoll e gostaria de saber mais sobre desenvolvimento de sites."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-white transition-colors"
              >
                (62) 98184-1878
              </a>
            </div>
            <p className="text-xs text-cyan-200 mt-3 font-semibold">
              ✨ Sites que vendem mais! ✨
            </p>
          </div>

          {/* Jogos Interativos */}
          <div>
            <FooterGames />
          </div>
        </div>
        
          {/* Criador do Site - Destaque */}
          <div className="tech-card p-8 mt-8 text-center tech-glow-hover opacity-50 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Code className="w-8 h-8 text-cyan-400" />
              <h3 className="text-2xl font-black neon-text">SITE CRIADO POR</h3>
            </div>
            <p className="text-cyan-300 mb-6 font-semibold">
              🚀 Desenvolvimento profissional de sites modernos e responsivos
            </p>
            <a 
              href="https://sites-vendas-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              <Code className="w-6 h-6" />
              <span>VER SITE DO DESENVOLVEDOR</span>
            </a>
            <p className="text-cyan-200 text-sm mt-4 font-semibold">
              ✨ Sites que vendem mais e impressionam clientes! ✨
            </p>
          </div>
        
        <div className="border-t border-cyan-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-semibold">&copy; 2024 FrySuRoll. Todos os direitos reservados.</p>
          <p className="text-cyan-400 text-sm mt-2 font-semibold">TECHNOLOGY MEETS SUSHI 🍣</p>
        </div>
      </div>
    </footer>
  )
}
