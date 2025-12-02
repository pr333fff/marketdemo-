import { motion } from 'framer-motion'
import { ShoppingBag } from '@phosphor-icons/react'
import { useStore } from '../store'

export default function CartButton({ onClick }) {
  const { getCartCount, getCartTotal } = useStore()
  const count = getCartCount()
  const total = getCartTotal()

  if (count === 0) return null

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 inset-x-0 z-40 p-4 safe-bottom"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full flex items-center justify-between h-14 px-5 rounded-2xl bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] shadow-lg shadow-primary-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag size={22} weight="bold" />
            <motion.div
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-white text-[var(--tg-theme-button-color)] text-[10px] font-bold"
            >
              {count}
            </motion.div>
          </div>
          <span className="font-semibold">Корзина</span>
        </div>
        
        <motion.span
          key={total}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold"
        >
          {formatPrice(total)}
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
