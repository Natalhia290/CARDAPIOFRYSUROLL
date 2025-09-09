'use client'

import { useState } from 'react'
import AnimatedDrinkIcon from './AnimatedDrinkIcon'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  category?: string
}

export default function ProductImage({ 
  src, 
  alt, 
  className = '',
  category = ''
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (imageError) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          {category === 'Bebidas' ? (
            <AnimatedDrinkIcon />
          ) : (
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🍤</span>
            </div>
          )}
          <p className="text-sm text-gray-600 font-medium">
            {category === 'Bebidas' ? 'Bebida gelada em breve!' : 'Sushi frito em breve!'}
          </p>
          <p className="text-xs text-gray-500">Imagem não disponível</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  )
}
