'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface HeroVideoProps {
  videoSrc: string
  fallbackImage?: string
  className?: string
}

export default function HeroVideo({ 
  videoSrc, 
  fallbackImage = '/images/hero-bg.jpg',
  className = ''
}: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = isMuted
      if (isPlaying) {
        video.play().catch(console.error)
      } else {
        video.pause()
      }
    }
  }, [isPlaying, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVideoError = () => {
    console.log('Erro ao carregar vídeo, usando imagem de fallback')
  }

  return (
    <div 
      className={`relative w-full h-full overflow-hidden group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onError={handleVideoError}
        poster={fallbackImage}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        {/* Fallback para navegadores que não suportam vídeo */}
        <img 
          src={fallbackImage} 
          alt="FrySuRoll Hero" 
          className="w-full h-full object-cover"
        />
      </video>

      {/* Overlay escuro para melhorar legibilidade do texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Controles do vídeo */}
      <div className={`absolute bottom-4 right-4 flex space-x-2 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        
        <button
          onClick={toggleMute}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Indicador de carregamento */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
        🎥 Vídeo em loop
      </div>
    </div>
  )
}
