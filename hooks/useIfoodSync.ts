'use client'

import { useState, useEffect, useCallback } from 'react'

interface IfoodData {
  prices: Record<string, number>
  isOpen: boolean
  nextOpenTime?: string | null
  lastUpdated: number
}

interface UseIfoodSyncReturn {
  data: IfoodData | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  isOpen: boolean
  nextOpenTime?: string
  getPrice: (productId: string) => number | null
}

export function useIfoodSync(): UseIfoodSyncReturn {
  const [data, setData] = useState<IfoodData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async (force = false) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/ifood/sync${force ? '?force=true' : ''}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Erro ao buscar preços')
      }
    } catch (err) {
      setError('Erro de conexão')
      console.error('Erro ao buscar preços do iFood:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(() => fetchPrices(true), [fetchPrices])

  const getPrice = useCallback((productId: string): number | null => {
    return data?.prices[productId] || null
  }, [data])

  // Buscar preços inicial
  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  // Atualizar automaticamente a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrices()
    }, 5 * 60 * 1000) // 5 minutos

    return () => clearInterval(interval)
  }, [fetchPrices])

  return {
    data,
    loading,
    error,
    refresh,
    isOpen: data?.isOpen || false,
    nextOpenTime: data?.nextOpenTime,
    getPrice
  }
}
