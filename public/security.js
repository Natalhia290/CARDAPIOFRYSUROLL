// Proteção adicional contra inspeção
(function() {
  'use strict';
  
  // Detectar e bloquear ferramentas de desenvolvedor
  let devtools = false;
  const threshold = 160;
  
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools) {
        devtools = true;
        // Redirecionar ou mostrar aviso
        document.body.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            text-align: center;
            z-index: 999999;
          ">
            <div>
              <h1 style="color: #ff0000; font-size: 48px; margin-bottom: 20px;">🚫</h1>
              <h2 style="color: #ff0000; margin-bottom: 20px;">ACESSO NEGADO</h2>
              <p style="font-size: 18px; margin-bottom: 15px;">Ferramentas de desenvolvedor detectadas!</p>
              <p style="font-size: 16px; margin-bottom: 20px;">Feche as ferramentas e recarregue a página.</p>
              <button onclick="location.reload()" style="
                background: #ff0000;
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 18px;
                cursor: pointer;
                border-radius: 5px;
              ">RECARREGAR PÁGINA</button>
            </div>
          </div>
        `;
      }
    } else {
      devtools = false;
    }
  }, 500);
  
  // Bloquear console
  const noop = function() {};
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'group', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd', 'count', 'clear', 'assert', 'table', 'dirxml', 'groupCollapsed'];
  
  methods.forEach(method => {
    if (window.console && window.console[method]) {
      window.console[method] = noop;
    }
  });
  
  // Bloquear teclas de atalho
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'A') ||
        (e.ctrlKey && e.key === 'P')) {
      e.preventDefault();
      return false;
    }
  });
  
  // Bloquear botão direito
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Bloquear seleção de texto
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Bloquear arrastar
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Ofuscar código adicional
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = function(func, delay) {
    return originalSetTimeout(function() {
      try {
        func();
      } catch(e) {
        // Silenciar erros
      }
    }, delay);
  };
  
  window.setInterval = function(func, delay) {
    return originalSetInterval(function() {
      try {
        func();
      } catch(e) {
        // Silenciar erros
      }
    }, delay);
  };
  
})();
