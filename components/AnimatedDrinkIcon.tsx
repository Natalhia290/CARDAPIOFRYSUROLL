'use client'

export default function AnimatedDrinkIcon() {
  return (
    <div className="relative w-16 h-16 mx-auto mb-2">
      {/* Copo */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-lg border-2 border-blue-500">
        {/* Bebida dentro do copo */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-amber-400 to-amber-300 rounded-b-md animate-pulse">
          {/* Bolhas */}
          <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full drink-bubble" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-2 right-3 w-1 h-1 bg-white rounded-full drink-bubble" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-3 left-4 w-1 h-1 bg-white rounded-full drink-bubble" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Gelo flutuando */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full sushi-bounce" style={{ animationDelay: '0.3s' }}></div>
      <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-white rounded-full sushi-bounce" style={{ animationDelay: '0.8s' }}></div>
      
      {/* Vapor */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-2 bg-white opacity-60 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -left-1 w-1 h-2 bg-white opacity-40 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute -right-1 w-1 h-2 bg-white opacity-40 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  )
}
