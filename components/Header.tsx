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
      
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl sticky top-0 z-50 border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-5 group">
              <div className="relative w-16 h-16 japanese-pulse group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo/logo.png"
                  alt="FrySuRoll Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback para logo caso não exista
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center"><span class="text-white font-black text-3xl">F</span></div>'
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-black japanese-text">FRYSUROLL</h1>
                <p className="text-sm text-red-300 font-semibold tracking-wider">SUSHI FRITO</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-red-100 hover:text-white font-bold transition-colors duration-300 hover:scale-105 transform text-lg">
              INÍCIO
            </Link>
            <Link href="/cardapio" className="text-red-100 hover:text-white font-bold transition-colors duration-300 hover:scale-105 transform text-lg">
              CARDÁPIO
            </Link>
            <Link href="/sobre" className="text-red-100 hover:text-white font-bold transition-colors duration-300 hover:scale-105 transform text-lg">
              SOBRE
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-3 text-red-200">
              <MapPin className="w-6 h-6" />
              <span className="font-semibold text-lg">Goiânia - GO</span>
            </div>
            <div className="flex items-center space-x-3 text-amber-200">
              <Phone className="w-6 h-6" />
              <span className="font-semibold text-lg">(62) 99504-5038</span>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 japanese-glow-hover"
          >
            <ShoppingCart className="w-7 h-7" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm rounded-full h-7 w-7 flex items-center justify-center font-bold shadow-lg">
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
