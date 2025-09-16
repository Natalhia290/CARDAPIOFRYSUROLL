'use client'

import { MapPin, Phone, Code, MessageCircle } from 'lucide-react'
import FooterGames from './FooterGames'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Empresa */}
          <div>
            <h3 className="text-2xl font-black neon-text mb-6">FRYSUROLL</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <span className="text-cyan-400 font-bold">Especialistas em sushi frito!</span> O melhor delivery de Goiânia com Hot Rolls, Sushidogrolls e pratos únicos.
            </p>
            <div className="flex items-center space-x-3 text-cyan-400">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Goiânia - GO</span>
            </div>
          </div>
          
          {/* Contato */}
            <div>
              <h4 className="text-xl font-bold neon-text mb-6">CONTATO</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">(62) 99504-5038</span>
                </div>
                <p className="text-cyan-400 font-semibold">WhatsApp: (62) 99504-5038</p>
                <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-cyan-500/20">
                  <p className="font-bold text-cyan-400 mb-2">Horário de Funcionamento:</p>
                  <p className="text-white font-semibold">18:00 às 23:59</p>
                </div>
              </div>
            </div>
          
          {/* Entrega */}
            <div>
              <h4 className="text-xl font-bold neon-text mb-6">ENTREGA</h4>
              <div className="text-gray-300 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="font-semibold">Taxa de entrega: <span className="text-cyan-400">R$ 10,00</span> (acima de 9 km)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="font-semibold">Toda Goiânia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-semibold">Entrega ultrarrápida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="font-semibold">Pedido mínimo: <span className="text-yellow-400">R$ 50,00</span></span>
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
