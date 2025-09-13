# Pasta de Vídeos - FrySuRoll

Esta pasta contém os vídeos que serão exibidos no site.

## Como usar:

1. **Adicione seus vídeos aqui** com os seguintes nomes:
   - `hero-video-1.mp4` - Primeiro vídeo do hero section
   - `hero-video-2.mp4` - Segundo vídeo do hero section  
   - `hero-video-3.mp4` - Terceiro vídeo do hero section
   - `hero-video-1.webm`, `hero-video-2.webm`, `hero-video-3.webm` - Versões WebM (opcional)

2. **Especificações recomendadas:**
   - **Formato:** MP4 (H.264) e/ou WebM
   - **Resolução:** 1920x1080 (Full HD) ou superior
   - **Duração:** 10-30 segundos (vai ficar em loop)
   - **Tamanho:** Máximo 10MB por vídeo
   - **Qualidade:** Otimizada para web

3. **Dicas:**
   - Use vídeos que mostrem o processo de preparo dos sushis
   - Evite vídeos muito longos (o ideal é 15-20 segundos)
   - Certifique-se de que o vídeo funciona bem em loop
   - Teste em dispositivos móveis

4. **Fallback:**
   - Se o vídeo não carregar, será exibida a imagem `/images/hero-bg.jpg`
   - Certifique-se de ter uma imagem de fallback adequada

## Exemplo de estrutura:
```
public/
├── videos/
│   ├── hero-video-1.mp4
│   ├── hero-video-2.mp4
│   ├── hero-video-3.mp4
│   ├── hero-video-1.webm (opcional)
│   ├── hero-video-2.webm (opcional)
│   ├── hero-video-3.webm (opcional)
│   └── README.md
└── images/
    └── hero-bg.jpg
```

## Controles do vídeo:
- **Múltiplos vídeos:** Sistema alterna entre 3 vídeos
- **Auto-play:** Inicia automaticamente em loop
- **Navegação:** Botões ⏮️ e ⏭️ para trocar vídeos
- **Controles:** Aparecem ao passar o mouse
- **Play/Pause:** Botão de reproduzir/pausar
- **Mute/Unmute:** Botão de som
- **Indicador:** Mostra qual vídeo está sendo exibido (ex: "Vídeo 2/3")
- **Mudo por padrão:** Melhor para UX
