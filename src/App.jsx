import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStore } from './store'
import Header from './components/Header'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import BottomNav from './components/BottomNav'
import ProfilePage from './components/ProfilePage'
import CartPage from './components/CartPage'

function App() {
  const { selectedProduct, setSelectedProduct } = useStore()
  const [isReady, setIsReady] = useState(false)
  const [activeTab, setActiveTab] = useState('catalog')

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()
      
      // Определяем тёмную тему
      const isDark = tg.colorScheme === 'dark'
      if (isDark) {
        document.documentElement.classList.add('dark')
      }
      
      // Применяем тему Telegram
      const bgColor = isDark ? '#0f0f0f' : '#ffffff'
      const textColor = isDark ? '#f5f5f5' : '#18181b'
      const hintColor = isDark ? '#8b8b8b' : '#71717a'
      const secondaryBg = isDark ? '#1a1a1a' : '#f4f4f5'
      
      document.documentElement.style.setProperty('--tg-theme-bg-color', bgColor)
      document.documentElement.style.setProperty('--tg-theme-text-color', textColor)
      document.documentElement.style.setProperty('--tg-theme-hint-color', hintColor)
      document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', secondaryBg)
      document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#3b82f6')
      
      // Устанавливаем переменные для карточек
      document.documentElement.style.setProperty('--card-bg', isDark ? '#1a1a1a' : '#ffffff')
      document.documentElement.style.setProperty('--surface-bg', secondaryBg)
      document.documentElement.style.setProperty('--surface-border', isDark ? '#2a2a2a' : '#e4e4e7')
    }
    
    setTimeout(() => setIsReady(true), 100)
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--tg-theme-bg-color)] pb-20">
      {activeTab === 'catalog' && (
        <>
          <Header />
          <Categories />
          <ProductGrid />
        </>
      )}
      
      {activeTab === 'cart' && (
        <CartPage />
      )}
      
      {activeTab === 'profile' && (
        <ProfilePage />
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
