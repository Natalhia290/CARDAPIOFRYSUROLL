import { Product } from '@/context/CartContext'

export const products: Product[] = [
  // Hot Rolls Dogs + Mini
  {
    id: 'sushidog-tilapia-mini',
    name: 'Sushidogroll de tilápia + 2 minis',
    price: 29.90,
    description: '1 sushi dog de tilápia e 2 minis',
    category: 'Hot Rolls Dogs + Mini',
    image: '/images/products/sushidog-tilapia-mini.jpg',
  },
  {
    id: 'sushidog-salmao-mini',
    name: 'Sushidogroll salmão + 2 minis',
    price: 39.90,
    description: '1 sushi dog de salmão e 2 minis',
    category: 'Hot Rolls Dogs + Mini',
    image: '/images/products/sushidog-salmao-mini.jpg',
  },

  // Combos Hot Rolls Dogs
  {
    id: 'combo-casal-salmao',
    name: 'Sushidogroll Salmão Casal + 2 Pepsi lata',
    price: 66.99,
    originalPrice: 123.78,
    description: 'Sushidogroll de salmão para 2 pessoas e 2 latas de Pepsi. Serve até 2 pessoas.',
    category: 'Combos Hot Rolls Dogs',
    discount: 46,
    image: '/images/products/combo-casal-salmao.jpg',
  },
  {
    id: 'combo-casal-tilapia',
    name: 'Sushidogroll Combo Casal Tilápia + 2 Pepsi Lata',
    price: 54.99,
    originalPrice: 103.78,
    description: 'Sushidogroll de tilápia para 2 pessoas e 2 latas de Pepsi. Serve até 2 pessoas.',
    category: 'Combos Hot Rolls Dogs',
    discount: 47,
    image: '/images/products/combo-casal-tilapia.jpg',
  },
  {
    id: 'combo-individual-salmao',
    name: 'Sushidogroll Salmão + Pepsi Lata Ou Água Com Gás',
    price: 56.89,
    description: 'Sushidogroll frito de salmão e uma Pepsi lata ou água com gás. Serve até 1 pessoa.',
    category: 'Combos Hot Rolls Dogs',
    image: '/images/products/combo-individual-salmao.jpg',
  },
  {
    id: 'combo-individual-tilapia',
    name: 'Sushidogroll Tilápia + Pepsi Lata Ou Água Com Gás',
    price: 46.89,
    description: 'Sushidogroll de tilápia e uma Pepsi lata ou água com gás. Serve até 1 pessoa.',
    category: 'Combos Hot Rolls Dogs',
    image: '/images/products/combo-individual-tilapia.jpg',
  },

  // Hots Barato mais que demais
  {
    id: 'hot-1-real',
    name: '1 hot por 1 real',
    price: 0.99,
    originalPrice: 1.00,
    description: 'Hot para 1 pessoa.',
    category: 'Hots Barato mais que demais',
    image: '/images/products/hot-1-real.jpg',
  },

  // Sushidogroll barato até demais
  {
    id: 'mini-sushidog-salmao',
    name: 'Mini Sushi Dog salmão (160g) Barato Demais',
    price: 24.99,
    description: 'Mini hot dog de sushi recheado com salmão empanado e crocante, com cream cheese. (aprox. 180g). Serve até 1 pessoa.',
    category: 'Sushidogroll barato até demais',
    image: '/images/products/mini-sushidog-salmao.jpg',
  },
  {
    id: 'mini-sushidog-tilapia',
    name: 'Mini Sushi Dog tilápia (160g) Barato Demais',
    price: 22.99,
    description: 'Mini hot dog de sushi recheado com tilápia empanada e crocante, com cream cheese. (aprox. 160g). Serve até 1 pessoa.',
    category: 'Sushidogroll barato até demais',
    image: '/images/products/mini-sushidog-tilapia.jpg',
  },

  // Sobremesa
  {
    id: 'torta-mousse-limao',
    name: 'Torta Mousse de limão',
    price: 9.90,
    originalPrice: 19.90,
    description: 'Torta para 1 pessoa.',
    category: 'Sobremesa',
    discount: 50,
    image: '/images/products/torta-mousse-limao.jpg',
  },

  // Bebidas
  {
    id: 'pepsi-1-5l',
    name: 'Pepsi 1,5L',
    price: 9.00,
    description: 'Serve até 3 pessoas.',
    category: 'Bebidas',
    image: '/images/products/pepsi-1-5l.jpg',
  },
  {
    id: 'pepsi-350ml',
    name: 'Pepsi 350ml Lata',
    price: 4.99,
    description: '(aprox. 350ml).',
    category: 'Bebidas',
    image: '/images/products/pepsi-350ml.jpg',
  },
  {
    id: 'pepsi-zero-350ml',
    name: 'Pepsi Zero 350ml Lata',
    price: 4.99,
    description: '(aprox. 350ml).',
    category: 'Bebidas',
    image: '/images/products/pepsi-zero-350ml.jpg',
  },
  {
    id: 'agua-com-gas-500ml',
    name: 'Água Mineral com Gás Club Água 500ml Garrafa',
    price: 4.99,
    description: '(aprox. 500ml).',
    category: 'Bebidas',
    image: '/images/products/agua-com-gas-500ml.jpg',
  },
  {
    id: 'agua-510ml',
    name: 'Água Mineral Água 510ml Unidade',
    price: 3.99,
    description: '(aprox. 510ml).',
    category: 'Bebidas',
    image: '/images/products/agua-510ml.jpg',
  },
]

export const categories = [
  'Hot Rolls Dogs + Mini',
  'Combos Hot Rolls Dogs',
  'Hots Barato mais que demais',
  'Sushidogroll barato até demais',
  'Sobremesa',
  'Bebidas',
]
