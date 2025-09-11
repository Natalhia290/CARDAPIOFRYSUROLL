/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de segurança
  poweredByHeader: false,
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ]
  },

  // Minificação e otimização
  swcMinify: true,
  
  // Desabilitar source maps em produção
  productionBrowserSourceMaps: false,
  
  // Configurações de build
  experimental: {
    // optimizeCss: true, // Desabilitado para evitar erros de build
  },

  // Webpack config para ofuscar código
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Ofuscar código JavaScript
      config.optimization.minimizer = config.optimization.minimizer || []
      
      // Adicionar plugins de ofuscação
      const TerserPlugin = require('terser-webpack-plugin')
      
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            mangle: {
              // Ofuscar nomes de variáveis e funções
              toplevel: true,
              properties: {
                regex: /^_/
              }
            },
            compress: {
              // Remover console.log em produção
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
            },
            format: {
              // Remover comentários
              comments: false
            }
          },
          extractComments: false
        })
      )
    }

    return config
  }
}

module.exports = nextConfig