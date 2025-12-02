import { motion } from 'framer-motion'
import { Storefront, ShoppingCart, User } from '@phosphor-icons/react'
import { useStore } from '../store'

export default function BottomNav({ activeTab, onTabChange }) {
  const { getCartCount } = useStore()
  const cartCount = getCartCount()

  const tabs = [
    { id: 'catalog', label: 'Каталог', icon: Storefront },
    { id: 'cart', label: 'Корзина', icon: ShoppingCart, badge: cartCount },
    { id: 'profile', label: 'Профиль', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[var(--tg-theme-bg-color)]/95 backdrop-blur-xl border-t border-[var(--surface-border)] safe-bottom">
      <div className="flex items-center justify-around h-16 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onTabChange(tab.id)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
              className="relative flex flex-col items-center gap-1 px-6 py-2"
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  weight={isActive ? 'fill' : 'regular'}
                  className={isActive ? 'text-[var(--tg-theme-button-color)]' : 'text-[var(--tg-theme-hint-color)]'}
                />
                
                {/* Badge */}
                {tab.badge > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-[var(--tg-theme-button-color)] text-white text-[10px] font-bold"
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </motion.div>
                )}
              </div>
              
              <span className={`text-[11px] font-medium ${
                isActive ? 'text-[var(--tg-theme-button-color)]' : 'text-[var(--tg-theme-hint-color)]'
              }`}>
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--tg-theme-button-color)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
