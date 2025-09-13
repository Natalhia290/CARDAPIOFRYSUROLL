# Pasta de Vídeos - FrySuRoll

Esta pasta contém os vídeos que serão exibidos no site.

## Como usar:

1. **Adicione seus vídeos aqui** com os seguintes nomes:
   - `hero-video.mp4` - Vídeo principal do hero section
   - `hero-video.webm` - Versão WebM (opcional, para melhor compatibilidade)

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
│   ├── hero-video.mp4
│   ├── hero-video.webm
│   └── README.md
└── images/
    └── hero-bg.jpg
```

## Controles do vídeo:
- O vídeo inicia automaticamente em loop
- Controles aparecem ao passar o mouse
- Botão de play/pause
- Botão de mute/unmute
- Vídeo fica mudo por padrão (melhor para UX)
