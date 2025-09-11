import { NextRequest, NextResponse } from 'next/server'

// URL da sua loja no iFood
const IFOOD_STORE_URL = 'https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c'

// Cache de preços (em produção, use Redis ou banco de dados)
let priceCache: {
  prices: Record<string, number>
  lastUpdated: number
  isOpen: boolean
  nextOpenTime?: string
} = {
  prices: {},
  lastUpdated: 0,
  isOpen: false
}

// Mapeamento dos produtos do seu site para os do iFood
const PRODUCT_MAPPING: Record<string, string> = {
  'combo-casal-salmao': 'Combo Casal Salmão',
  'combo-casal-tilapia': 'Combo Casal Tilápia', 
  'combo-individual-salmao': 'Combo Individual Salmão',
  'combo-individual-tilapia': 'Combo Individual Tilápia',
  'hot-1-real': 'Hot Roll 1 Real',
  'mini-sushidog-salmao': 'Mini Sushidog Salmão',
  'mini-sushidog-tilapia': 'Mini Sushidog Tilápia',
  'sushidog-salmao-mini': 'Sushidog Salmão Mini',
  'sushidog-tilapia-mini': 'Sushidog Tilápia Mini',
  'torta-mousse-limao': 'Torta Mousse Limão'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const forceUpdate = searchParams.get('force') === 'true'
    
    // Verificar se o cache ainda é válido (5 minutos)
    const now = Date.now()
    const cacheValid = now - priceCache.lastUpdated < 5 * 60 * 1000
    
    if (!forceUpdate && cacheValid && Object.keys(priceCache.prices).length > 0) {
      return NextResponse.json({
        success: true,
        data: priceCache,
        cached: true
      })
    }

    // Simular busca de preços do iFood (em produção, use web scraping ou API oficial)
    const mockPrices = await fetchPricesFromIfood()
    
    // Atualizar cache
    priceCache = {
      prices: mockPrices.prices,
      lastUpdated: now,
      isOpen: mockPrices.isOpen,
      nextOpenTime: mockPrices.nextOpenTime
    }

    return NextResponse.json({
      success: true,
      data: priceCache,
      cached: false
    })

  } catch (error) {
    console.error('Erro ao sincronizar preços do iFood:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro ao buscar preços do iFood',
      data: priceCache // Retornar cache mesmo com erro
    }, { status: 500 })
  }
}

// Função para simular busca de preços do iFood
async function fetchPricesFromIfood() {
  // Em produção, aqui você faria web scraping ou usaria a API oficial do iFood
  // Por enquanto, vou simular com dados baseados no seu cardápio atual
  
  const currentHour = new Date().getHours()
  const isOpen = currentHour >= 16 && currentHour < 23 // Abre às 16h, fecha às 23h
  
  // Preços simulados (em produção, estes viriam do iFood)
  const prices: Record<string, number> = {
    'combo-casal-salmao': 45.90,
    'combo-casal-tilapia': 42.90,
    'combo-individual-salmao': 28.90,
    'combo-individual-tilapia': 25.90,
    'hot-1-real': 1.00,
    'mini-sushidog-salmao': 8.90,
    'mini-sushidog-tilapia': 7.90,
    'sushidog-salmao-mini': 12.90,
    'sushidog-tilapia-mini': 11.90,
    'torta-mousse-limao': 15.90
  }

  // Adicionar variação de preços (simular promoções do iFood)
  const variation = 0.9 + Math.random() * 0.2 // Variação de -10% a +10%
  Object.keys(prices).forEach(key => {
    prices[key] = Math.round(prices[key] * variation * 100) / 100
  })

  return {
    prices,
    isOpen,
    nextOpenTime: isOpen ? null : '16:00'
  }
}

// Função para web scraping real do iFood (implementação futura)
async function scrapeIfoodPrices() {
  try {
    // Em produção, você usaria uma biblioteca como Puppeteer ou Playwright
    // para fazer web scraping da página do iFood
    
    const response = await fetch(IFOOD_STORE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    
    // Aqui você extrairia os preços e status do HTML
    // Por enquanto, retornar dados simulados
    return fetchPricesFromIfood()
    
  } catch (error) {
    console.error('Erro no web scraping:', error)
    return fetchPricesFromIfood() // Fallback para dados simulados
  }
}
