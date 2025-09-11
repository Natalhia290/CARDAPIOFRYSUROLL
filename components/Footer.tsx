'use client'

import { MapPin, Phone, Code, MessageCircle } from 'lucide-react'
import FooterGames from './FooterGames'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">FrySuRoll</h3>
            <p className="text-gray-300 mb-4">
              Especialistas em sushi frito! O melhor delivery de Goiânia com Hot Rolls, Sushidogrolls e pratos únicos.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>Goiânia - GO</span>
            </div>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(62) 99504-5038</span>
              </div>
              <p>WhatsApp: (62) 99504-5038</p>
            </div>
          </div>
          
          {/* Entrega */}
          <div>
            <h4 className="font-semibold mb-4">Entrega</h4>
            <div className="text-gray-300 space-y-1">
              <p>• R$ 1,00 por quilômetro</p>
              <p>• Toda Goiânia</p>
              <p>• Entrega rápida</p>
            </div>
          </div>

          {/* Desenvolvimento de Sites */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Code className="w-5 h-5" />
              <h4 className="font-bold text-lg">Desenvolvimento de Sites</h4>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              💻 Precisa de um site igual a este? 
            </p>
            <p className="text-blue-100 text-sm mb-4">
              Sites modernos, responsivos e otimizados para vendas online!
            </p>
            <div className="flex items-center space-x-2 text-blue-100">
              <MessageCircle className="w-4 h-4" />
              <a 
                href="https://wa.me/5562981841878?text=Olá! Vi o site do FrySuRoll e gostaria de saber mais sobre desenvolvimento de sites."
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-white transition-colors"
              >
                (62) 98184-1878
              </a>
            </div>
            <p className="text-xs text-blue-200 mt-2">
              ✨ Sites que vendem mais! ✨
            </p>
          </div>

          {/* Jogos Interativos */}
          <div>
            <FooterGames />
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 FrySuRoll. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
