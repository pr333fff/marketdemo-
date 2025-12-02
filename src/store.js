import { create } from 'zustand'

// Моковые данные
const categories = [
  { id: 1, name: 'Онлайн-курсы', slug: 'courses' },
  { id: 2, name: 'Консультации', slug: 'consult' },
  { id: 3, name: 'Цифровые товары', slug: 'digital' },
  { id: 4, name: 'Подписки', slug: 'subscriptions' },
]

const products = [
  {
    id: 1,
    categoryId: 1,
    name: 'Основы маркетинга',
    description: 'Базовый курс по интернет-маркетингу для начинающих',
    price: 4990,
    oldPrice: 7990,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    badge: 'Хит',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    categoryId: 1,
    name: 'SMM с нуля до PRO',
    description: 'Полный курс по продвижению в социальных сетях',
    price: 14990,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    badge: 'Новинка',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    categoryId: 1,
    name: 'Telegram-боты для бизнеса',
    description: 'Создание ботов без программирования',
    price: 9990,
    oldPrice: 12990,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    categoryId: 2,
    name: 'Разбор вашего бизнеса',
    description: '60-минутная личная консультация с экспертом',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    rating: 5.0,
    reviews: 34,
  },
  {
    id: 5,
    categoryId: 2,
    name: 'Аудит рекламы',
    description: 'Анализ рекламных кампаний + рекомендации',
    price: 5000,
    oldPrice: 8000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    badge: 'Скидка',
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 6,
    categoryId: 3,
    name: 'Контент-план на 30 дней',
    description: 'Готовый план публикаций с идеями постов',
    price: 990,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    badge: 'Хит',
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 7,
    categoryId: 3,
    name: 'Набор шаблонов для Canva',
    description: '50 профессиональных дизайнов для соцсетей',
    price: 1490,
    oldPrice: 2490,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    badge: 'Новинка',
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 8,
    categoryId: 4,
    name: 'PRO подписка',
    description: 'Полный доступ + личные разборы каждый месяц',
    price: 2990,
    oldPrice: 4990,
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
    badge: 'Выгодно',
    rating: 4.9,
    reviews: 78,
  },
]

export const useStore = create((set, get) => ({
  // Данные
  categories,
  products,
  
  // Фильтры
  activeCategory: null,
  searchQuery: '',
  
  // Корзина
  cart: [],
  
  // UI состояния
  selectedProduct: null,
  isCartOpen: false,
  
  // Действия с фильтрами
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Получение отфильтрованных товаров
  getFilteredProducts: () => {
    const { products, activeCategory, searchQuery } = get()
    let filtered = products
    
    if (activeCategory) {
      filtered = filtered.filter(p => p.categoryId === activeCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      )
    }
    
    return filtered
  },
  
  // Действия с корзиной
  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find(item => item.id === product.id)
      if (existing) {
        return {
          cart: state.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    })
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id !== productId)
    }))
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }
    set((state) => ({
      cart: state.cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }))
  },
  
  clearCart: () => set({ cart: [] }),
  
  getCartTotal: () => {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  
  getCartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  // UI действия
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}))
