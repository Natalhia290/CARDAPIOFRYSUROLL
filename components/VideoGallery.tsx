'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface VideoGalleryProps {
  videos: string[]
  title?: string
  description?: string
}

export default function VideoGallery({ 
  videos, 
  title = "Nossos Vídeos",
  description = "Veja como preparamos nossos deliciosos sushis"
}: VideoGalleryProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showModal, setShowModal] = useState(false)
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
  }, [isPlaying, isMuted, currentVideoIndex])

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    setIsPlaying(true)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const openModal = (index: number) => {
    setCurrentVideoIndex(index)
    setShowModal(true)
    setIsPlaying(true)
    setIsMuted(false) // Ativa o áudio quando abre o modal
  }

  const closeModal = () => {
    setShowModal(false)
    setIsPlaying(false)
  }

  if (videos.length === 0) return null

  return (
    <>
      {/* Seção de Vídeos */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Grid de Vídeos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => openModal(index)}
              >
                {/* Vídeo reproduzindo automaticamente */}
                <div className="relative aspect-video bg-gray-200">
                  <video
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  
                  {/* Overlay sutil para indicar que é clicável */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <div className="bg-white bg-opacity-0 group-hover:bg-opacity-20 rounded-full p-4 group-hover:scale-110 transition-all">
                      <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Indicador de clique para áudio */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    🔊 Clique para áudio
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Vídeo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Botão fechar */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Vídeo principal */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
              >
                <source src={videos[currentVideoIndex]} type="video/mp4" />
              </video>

              {/* Controles */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevVideo}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    disabled={videos.length === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                  {currentVideoIndex + 1} / {videos.length}
                </div>

                <button
                  onClick={nextVideo}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  disabled={videos.length === 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails dos outros vídeos */}
            {videos.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`flex-shrink-0 w-20 h-12 rounded overflow-hidden ${
                      index === currentVideoIndex ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
