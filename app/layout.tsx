import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Cart from '@/components/Cart'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FrySuRoll - O Melhor Delivery de Sushi Frito',
  description: 'Especialistas em sushi frito! O melhor delivery de Goiânia com Hot Rolls, Sushidogrolls e pratos únicos. Entrega rápida e sabor incomparável.',
  keywords: 'sushi frito, delivery, goiânia, hot rolls, sushidogroll, sushi empanado, especialidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 pb-20">
              {children}
            </main>
            <Footer />
            <Cart />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
