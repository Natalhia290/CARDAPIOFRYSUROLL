'use client'

import { useEffect } from 'react'

export default function SecurityProtection() {
  useEffect(() => {
    // Desabilitar botão direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Desabilitar teclas de desenvolvedor
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'A') ||
        (e.ctrlKey && e.key === 'P')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Desabilitar seleção de texto
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Desabilitar arrastar
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Bloquear console
    const blockConsole = () => {
      const noop = () => {}
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'group', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd', 'count', 'clear', 'assert', 'table', 'dirxml', 'groupCollapsed']
      
      methods.forEach(method => {
        if (window.console && (window.console as any)[method]) {
          (window.console as any)[method] = noop
        }
      })
    }

    // Aviso de proteção
    const showWarning = () => {
      const warning = document.createElement('div')
      warning.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1 style="color: #ff4444; margin-bottom: 20px;">⚠️ ACESSO NEGADO ⚠️</h1>
            <p style="font-size: 18px; margin-bottom: 15px;">Este site está protegido contra inspeção não autorizada.</p>
            <p style="font-size: 16px; margin-bottom: 20px;">Por favor, feche as ferramentas de desenvolvedor e recarregue a página.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
              background: #ff4444;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              border-radius: 5px;
            ">Fechar</button>
          </div>
        </div>
      `
      document.body.appendChild(warning)
    }

    // Detectar ferramentas de desenvolvedor
    const detectDevTools = () => {
      let devtools = false
      const threshold = 160

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools) {
            devtools = true
            showWarning()
          }
        } else {
          devtools = false
        }
      }, 500)
    }

    // Aplicar proteções
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)
    
    // Bloquear console
    blockConsole()
    
    // Detectar dev tools
    detectDevTools()

    // CSS para desabilitar seleção
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      body {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -khtml-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    `
    document.head.appendChild(style)

    // Limpar ao desmontar
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return null
}
