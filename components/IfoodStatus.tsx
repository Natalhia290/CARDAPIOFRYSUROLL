'use client'

import { useIfoodSync } from '@/hooks/useIfoodSync'
import { Clock, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function IfoodStatus() {
  const { isOpen, nextOpenTime, loading, error, refresh } = useIfoodSync()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  const formatLastUpdate = () => {
    const now = new Date()
    return now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <img 
            src="https://static.ifood.com.br/image/upload/t_high/logosgde/ifood_logo.png" 
            alt="iFood" 
            className="w-6 h-6 mr-2"
          />
          Status da Loja
        </h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm">Atualizar</span>
        </button>
      </div>

      <div className="space-y-3">
        {/* Status da Loja */}
        <div className="flex items-center space-x-3">
          {loading ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
          ) : isOpen ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          
          <div>
            <p className={`font-medium ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
              {loading ? 'Verificando...' : isOpen ? 'Loja Aberta' : 'Loja Fechada'}
            </p>
            {!isOpen && nextOpenTime && (
              <p className="text-sm text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Abre às {nextOpenTime}
              </p>
            )}
          </div>
        </div>

        {/* Preços Sincronizados */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-600">
            Preços sincronizados com iFood
          </p>
        </div>

        {/* Última Atualização */}
        <div className="text-xs text-gray-500">
          Última atualização: {formatLastUpdate()}
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">
              ⚠️ Erro ao sincronizar preços: {error}
            </p>
          </div>
        )}

        {/* Aviso quando fechado */}
        {!isOpen && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              🕐 Nossa loja está fechada no momento. 
              {nextOpenTime && ` Abriremos às ${nextOpenTime}.`}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Você ainda pode fazer pedidos pelo WhatsApp!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
