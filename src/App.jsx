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
      
      // Применяем тему Telegram
      document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#18181b')
      document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#71717a')
      document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#0ea5e9')
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
