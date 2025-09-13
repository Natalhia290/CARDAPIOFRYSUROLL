'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface HeroVideoProps {
  videoSrc?: string
  videoSources?: string[]
  fallbackImage?: string
  className?: string
}

export default function HeroVideo({ 
  videoSrc, 
  videoSources = [],
  fallbackImage = '/images/hero-bg.jpg',
  className = ''
}: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Lista de vídeos disponíveis
  const availableVideos = videoSources.length > 0 ? videoSources : (videoSrc ? [videoSrc] : [])

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

  // Função para alternar para o próximo vídeo
  const nextVideo = () => {
    if (availableVideos.length > 1) {
      setCurrentVideoIndex((prev) => (prev + 1) % availableVideos.length)
    }
  }

  // Função para alternar para o vídeo anterior
  const prevVideo = () => {
    if (availableVideos.length > 1) {
      setCurrentVideoIndex((prev) => (prev - 1 + availableVideos.length) % availableVideos.length)
    }
  }

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
      {/* Vídeos de fundo */}
      {availableVideos.map((video, index) => (
        <video
          key={index}
          ref={index === currentVideoIndex ? videoRef : null}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loop
          muted={isMuted}
          playsInline
          onError={handleVideoError}
          poster={fallbackImage}
        >
          <source src={video} type="video/mp4" />
          <source src={video.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      ))}
      
      {/* Fallback para quando não há vídeos */}
      {availableVideos.length === 0 && (
        <img 
          src={fallbackImage} 
          alt="FrySuRoll Hero" 
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay escuro para melhorar legibilidade do texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Controles do vídeo */}
      <div className={`absolute bottom-4 right-4 flex space-x-2 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Controles de navegação entre vídeos */}
        {availableVideos.length > 1 && (
          <>
            <button
              onClick={prevVideo}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Vídeo anterior"
            >
              ⏮️
            </button>
            <button
              onClick={nextVideo}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Próximo vídeo"
            >
              ⏭️
            </button>
          </>
        )}
        
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

      {/* Indicador de vídeo */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
        🎥 Vídeo {availableVideos.length > 1 ? `${currentVideoIndex + 1}/${availableVideos.length}` : 'em loop'}
      </div>
    </div>
  )
}
