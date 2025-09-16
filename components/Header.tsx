'use client'

import { ShoppingCart, MapPin, Phone } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import StoreStatus from './StoreStatus'

export default function Header() {
  const { getTotalItems, toggleCart } = useCart()

  return (
    <>
      {/* Store Status Banner */}
      <StoreStatus />
      
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-14 h-14 tech-pulse group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo/logo.png"
                  alt="FrySuRoll Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback para logo caso não exista
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center"><span class="text-white font-black text-2xl">F</span></div>'
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black neon-text">FRYSUROLL</h1>
                <p className="text-xs text-cyan-400 font-semibold tracking-wider">SUSHI FRITO</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 font-bold transition-colors duration-300 hover:scale-105 transform">
              INÍCIO
            </Link>
            <Link href="/cardapio" className="text-gray-300 hover:text-cyan-400 font-bold transition-colors duration-300 hover:scale-105 transform">
              CARDÁPIO
            </Link>
            <Link href="/sobre" className="text-gray-300 hover:text-cyan-400 font-bold transition-colors duration-300 hover:scale-105 transform">
              SOBRE
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-cyan-400">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Goiânia - GO</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(62) 99504-5038</span>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 tech-glow-hover"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
    </>
  )
}
