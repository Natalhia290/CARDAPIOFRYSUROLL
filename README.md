# FrySuRoll - Delivery de Sushi

Site de delivery de sushi para Goiânia com carrinho de compras e integração com WhatsApp.

## 🍣 Sobre o Projeto

O FrySuRoll é um site de delivery especializado em sushi, oferecendo uma experiência única com pratos inovadores como Sushidogrolls. O site permite que os clientes naveguem pelo cardápio, adicionem itens ao carrinho e façam pedidos diretamente pelo WhatsApp.

## ✨ Funcionalidades

- **Cardápio Completo**: Todos os produtos organizados por categorias
- **Carrinho de Compras**: Adicionar, remover e ajustar quantidades
- **Cálculo de Frete**: R$ 1,00 por quilômetro de distância
- **Integração WhatsApp**: Envio direto do pedido para o WhatsApp
- **Design Responsivo**: Funciona perfeitamente em mobile e desktop
- **Link iFood**: Integração com a plataforma iFood

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Context API** - Gerenciamento de estado do carrinho

## 📱 Como Usar

1. Navegue pelo cardápio na página inicial
2. Adicione produtos ao carrinho clicando em "Adicionar ao Carrinho"
3. Abra o carrinho clicando no ícone do carrinho no header
4. Preencha a distância para entrega (em KM)
5. Preencha seus dados de contato
6. Clique em "Pedir no WhatsApp" para enviar o pedido

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

## 📦 Deploy no Vercel

O projeto está configurado para deploy automático no Vercel:

1. Conecte seu repositório GitLab ao Vercel
2. Configure as variáveis de ambiente se necessário
3. O deploy será feito automaticamente a cada push

### Configuração do GitLab

```bash
cd existing_repo
git remote add origin https://gitlab.com/claudioghabryel.cg-group/claudioghabryel.cg-project.git
git branch -M main
git push -uf origin main
```

## 📞 Contato

- **WhatsApp**: (62) 99504-5038
- **iFood**: [Link do iFood](https://www.ifood.com.br/delivery/goiania-go/fry-residencial-itaipu/aacdd501-7523-4273-b5cf-9f8610b08e9c?utm_medium=share)

## 🎨 Estrutura do Projeto

```
├── app/                    # Páginas do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── cardapio/          # Página do cardápio
│   └── sobre/             # Página sobre
├── components/            # Componentes React
│   ├── Header.tsx         # Cabeçalho
│   └── Cart.tsx           # Carrinho de compras
├── context/               # Context API
│   └── CartContext.tsx    # Contexto do carrinho
├── data/                  # Dados estáticos
│   └── products.ts        # Lista de produtos
└── utils/                 # Utilitários
    └── formatPrice.ts     # Formatação de preços
```

## 🔧 Próximas Funcionalidades

- [ ] Upload de imagens dos produtos
- [ ] Sistema de avaliações
- [ ] Histórico de pedidos
- [ ] Notificações em tempo real
- [ ] Integração com pagamento online

## 📄 Licença

Este projeto é privado e pertence ao FrySuRoll.

