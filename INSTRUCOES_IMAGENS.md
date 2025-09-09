# 📸 Instruções para Adicionar Imagens

## Estrutura de Pastas

```
public/
├── images/
│   ├── logo/
│   │   └── logo.png          # Sua logo principal
│   └── products/
│       ├── placeholder.jpg   # Imagem padrão (já existe)
│       ├── sushidog-tilapia-mini.jpg
│       ├── sushidog-salmao-mini.jpg
│       ├── combo-casal-salmao.jpg
│       ├── combo-casal-tilapia.jpg
│       ├── combo-individual-salmao.jpg
│       ├── combo-individual-tilapia.jpg
│       ├── hot-1-real.jpg
│       ├── 5-hots-tilapia.jpg
│       ├── mini-sushidog-salmao.jpg
│       ├── mini-sushidog-tilapia.jpg
│       ├── torta-mousse-limao.jpg
│       ├── pepsi-1-5l.jpg
│       ├── pepsi-350ml.jpg
│       ├── pepsi-zero-350ml.jpg
│       ├── agua-com-gas-500ml.jpg
│       └── agua-510ml.jpg
```

## 📋 Lista de Imagens Necessárias

### Logo
- **Arquivo**: `public/images/logo/logo.png`
- **Tamanho recomendado**: 200x200px (quadrada)
- **Formato**: PNG com fundo transparente

### Produtos do Cardápio

#### Hot Rolls Dogs + Mini
1. `sushidog-tilapia-mini.jpg` - Sushidogroll de tilápia + 2 minis
2. `sushidog-salmao-mini.jpg` - Sushidogroll salmão + 2 minis

#### Combos Hot Rolls Dogs
3. `combo-casal-salmao.jpg` - Sushidogroll Salmão Casal + 2 Pepsi lata
4. `combo-casal-tilapia.jpg` - Sushidogroll Combo Casal Tilápia + 2 Pepsi Lata
5. `combo-individual-salmao.jpg` - Sushidogroll Salmão + Pepsi Lata Ou Água Com Gás
6. `combo-individual-tilapia.jpg` - Sushidogroll Tilápia + Pepsi Lata Ou Água Com Gás

#### Hots Barato mais que demais
7. `hot-1-real.jpg` - 1 hot por 1 real
8. `5-hots-tilapia.jpg` - 5 hots filadélfia de tilápia por 1 Real

#### Sushidogroll barato até demais
9. `mini-sushidog-salmao.jpg` - Mini Sushi Dog salmão (160g) Barato Demais
10. `mini-sushidog-tilapia.jpg` - Mini Sushi Dog tilápia (160g) Barato Demais

#### Sobremesa
11. `torta-mousse-limao.jpg` - Torta Mousse de limão

#### Bebidas
12. `pepsi-1-5l.jpg` - Pepsi 1,5L
13. `pepsi-350ml.jpg` - Pepsi 350ml Lata
14. `pepsi-zero-350ml.jpg` - Pepsi Zero 350ml Lata
15. `agua-com-gas-500ml.jpg` - Água Mineral com Gás Club Água 500ml Garrafa
16. `agua-510ml.jpg` - Água Mineral Água 510ml Unidade

## 📐 Especificações Técnicas

### Tamanhos Recomendados
- **Logo**: 200x200px (quadrada)
- **Produtos**: Qualquer tamanho, mas proporção 4:3 funciona melhor
- **Formato**: JPG para produtos, PNG para logo
- **Qualidade**: 80-90% para JPG
- **Tamanho máximo**: 1MB por imagem
- **Orientação**: Horizontal (paisagem) funciona melhor

### Dicas de Fotografia para Sushi Frito
- **Iluminação**: Use luz natural ou iluminação suave para destacar o crocante
- **Fundo**: Fundo neutro (branco, cinza claro) ou madeira clara
- **Enquadramento**: Mostre o produto de cima (vista superior) para destacar o formato
- **Foco**: Destaque a textura crocante e o recheio
- **Consistência**: Mantenha o mesmo estilo visual em todas as fotos
- **Proporção**: Sempre 4:3 (800x600px) para uniformidade
- **Destaque**: Mostre o contraste entre o exterior dourado e o interior cremoso

## 🔧 Como Adicionar as Imagens

1. **Crie as pastas** (se não existirem):
   ```bash
   mkdir -p public/images/logo
   mkdir -p public/images/products
   ```

2. **Adicione sua logo**:
   - Salve como `public/images/logo/logo.png`
   - Mantenha o nome exato: `logo.png`

3. **Adicione as imagens dos produtos**:
   - Salve cada imagem com o nome exato listado acima
   - Coloque todas em `public/images/products/`

4. **Teste o site**:
   ```bash
   npm run dev
   ```
   - Acesse `http://localhost:3000`
   - Verifique se as imagens aparecem corretamente

## ⚠️ Fallback Automático

O sistema já está configurado com fallbacks:
- Se a logo não existir, mostra um círculo com a letra "F"
- Se uma imagem de produto não existir, mostra um placeholder com emoji de sushi
- Se uma imagem falhar ao carregar, mostra uma mensagem "Imagem não disponível"

## 🚀 Após Adicionar as Imagens

1. Teste localmente: `npm run dev`
2. Faça commit das imagens: `git add public/images/`
3. Faça push: `git push origin main`
4. O Vercel fará o deploy automaticamente

## 📱 Otimização para Mobile

As imagens são automaticamente otimizadas pelo Next.js:
- Lazy loading (carregamento sob demanda)
- Redimensionamento automático
- Compressão otimizada
- Suporte a WebP quando disponível
