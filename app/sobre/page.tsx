import { MapPin, Clock, Phone, Star, Heart } from 'lucide-react'

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre o FrySuRoll</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Especialistas em sushi frito! Uma experiência única em Goiânia, combinando tradição japonesa 
            com inovação culinária para criar os melhores Hot Rolls e Sushidogrolls.
          </p>
          <p className="text-lg font-semibold text-primary-600">🍤 Nossa especialidade: Sushi frito crocante e saboroso! 🍤</p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                O FrySuRoll nasceu da paixão por sushi frito e da vontade de trazer algo 
                único para Goiânia. Nossa missão é ser referência em sushi frito, 
                oferecendo pratos únicos como nossos famosos Sushidogrolls e Hot Rolls, 
                que combinam a tradição japonesa com técnicas de fritura inovadoras.
              </p>
              <p>
                Cada prato é preparado com ingredientes frescos e selecionados, 
                garantindo aquele crocante perfeito e sabor único. Nossa equipe é formada por 
                chefs especializados em sushi frito que dedicam amor e cuidado em cada preparo.
              </p>
              <p>
                Estamos comprometidos em oferecer não apenas o melhor sushi frito de Goiânia, 
                mas também uma experiência completa de entrega rápida e atendimento 
                de qualidade.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nossos Valores</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Paixão pela Culinária</h4>
                  <p className="text-gray-600">Cada prato é preparado com amor e dedicação</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Qualidade Garantida</h4>
                  <p className="text-gray-600">Ingredientes frescos e selecionados</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Entrega Rápida</h4>
                  <p className="text-gray-600">Seu pedido chega quentinho e no prazo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Entrega em Toda Goiânia</h3>
              <p className="text-gray-600">
                Entregamos em todos os bairros de Goiânia com rapidez e qualidade
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-green-600">✓</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Taxa de Entrega</h3>
              <p className="text-gray-600">
                Taxa de entrega de R$ 10,00 para toda Goiânia
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pedido pelo WhatsApp</h3>
              <p className="text-gray-600">
                Faça seu pedido direto pelo WhatsApp de forma rápida e prática
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">(62) 99504-5038</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Goiânia - GO</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">18:00 às 23:59</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600 font-bold">💰</span>
                  <span className="text-gray-700">Pedido mínimo: R$ 50,00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">Taxa de entrega: R$ 10,00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">Atendimento todos os dias</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Também estamos no iFood</h3>
              <p className="text-gray-600 mb-4">
                Peça também pelo iFood e aproveite as promoções da plataforma
              </p>
              <a
                href="https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <span>Pedir no iFood</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
