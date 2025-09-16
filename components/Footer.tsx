'use client'

import { MapPin, Phone, Code, MessageCircle, Clock, Truck, Star } from 'lucide-react'
import FooterGames from './FooterGames'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-modern section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Empresa */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-black text-gradient mb-6">FRYSUROLL</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <span className="text-blue-400 font-bold">Especialistas em sushi frito!</span> O melhor delivery de Goiânia com Hot Rolls, Sushidogrolls e pratos únicos.
            </p>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Goiânia - GO</span>
            </div>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Contato</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">(62) 99504-5038</span>
              </div>
              <p className="text-gray-400 font-semibold">WhatsApp: (62) 99504-5038</p>
              <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
                <p className="font-bold text-amber-400 mb-2">Horário de Funcionamento:</p>
                <p className="text-white font-semibold">18:00 às 23:59</p>
              </div>
            </div>
          </div>
          
          {/* Entrega */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-blue-400">Entrega</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="font-semibold">Taxa de entrega será calculada pela loja</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="font-semibold">Entrega rápida</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="font-semibold">Pedido mínimo: <span className="text-purple-400">R$ 50,00</span></span>
              </div>
            </div>
          </div>

          {/* Desenvolvimento de Sites */}
          <div className="card p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-lg text-blue-400">Desenvolvimento de Sites</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3 font-semibold">
              💻 Precisa de um site igual a este? 
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Sites modernos, responsivos e otimizados para vendas online!
            </p>
            <div className="flex items-center space-x-3 text-blue-400">
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
            <p className="text-xs text-gray-400 mt-3 font-semibold">
              ✨ Sites que vendem mais! ✨
            </p>
          </div>
        </div>
        
        {/* Jogos Interativos */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <FooterGames />
        </div>
        
        {/* Criador do Site */}
        <div className="card p-8 mt-8 text-center bg-gray-800 border-gray-700">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Code className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-black text-gradient">Site Criado Por</h3>
          </div>
          <p className="text-gray-300 mb-6 font-semibold">
            🚀 Desenvolvimento profissional de sites modernos e responsivos
          </p>
          <a 
            href="https://starkdev-sites-vendas.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Code className="w-6 h-6" />
            <span>Ver Site do Desenvolvedor</span>
          </a>
          <p className="text-gray-400 text-sm mt-4 font-semibold">
            ✨ Sites que vendem mais e impressionam clientes! ✨
          </p>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-semibold">&copy; 2024 FrySuRoll. Todos os direitos reservados.</p>
          <p className="text-blue-400 text-sm mt-2 font-semibold">TRADIÇÃO JAPONESA REINVENTADA 🍣</p>
        </div>
      </div>
    </footer>
  )
}