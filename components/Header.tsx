'use client'

import { ShoppingCart, MapPin, Phone, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import StoreStatus from './StoreStatus'
import { useState } from 'react'

export default function Header() {
  const { getTotalItems, toggleCart } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Store Status Banner */}
      <StoreStatus />
      
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container-modern">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo/logo.png"
                  alt="FrySuRoll Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><span class="text-white font-black text-xl">F</span></div>'
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gradient">FRYSUROLL</h1>
                <p className="text-sm text-gray-500 font-semibold">SUSHI FRITO</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform">
                Início
              </Link>
              <Link href="/cardapio" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform">
                Cardápio
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform">
                Sobre
              </Link>
            </nav>

            {/* Contact Info - Desktop */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">Goiânia - GO</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(62) 99504-5038</span>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-4 py-6 space-y-4">
                <Link 
                  href="/" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  href="/cardapio" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cardápio
                </Link>
                <Link 
                  href="/sobre" 
                  className="block text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sobre
                </Link>
                
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Goiânia - GO</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">(62) 99504-5038</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}