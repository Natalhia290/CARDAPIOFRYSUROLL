'use client'

import { ShoppingCart, MapPin, Phone } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { getTotalItems, toggleCart } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo/logo.png"
                  alt="FrySuRoll Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback para logo caso não exista
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = '<div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center"><span class="text-white font-bold text-lg">F</span></div>'
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FrySuRoll</h1>
                <p className="text-xs text-gray-500">Delivery de Sushi</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Início
            </Link>
            <Link href="/cardapio" className="text-gray-700 hover:text-primary-600 font-medium">
              Cardápio
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary-600 font-medium">
              Sobre
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Goiânia - GO</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>(62) 99504-5038</span>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
