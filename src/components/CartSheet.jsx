import { motion } from 'framer-motion'
import { X, Minus, Plus, Trash, CreditCard, ShieldCheck } from '@phosphor-icons/react'
import { useStore } from '../store'

export default function CartSheet({ onClose }) {
  const { cart, getCartTotal, updateQuantity, removeFromCart, clearCart } = useStore()
  const total = getCartTotal()

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const handleCheckout = () => {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success')
    
    // Отправляем данные в бот
    if (window.Telegram?.WebApp) {
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total
      }
      window.Telegram.WebApp.sendData(JSON.stringify(orderData))
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />
      
      {/* Sheet */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[var(--tg-theme-bg-color)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
          <h2 className="text-lg font-bold text-[var(--tg-theme-text-color)]">
            Корзина
          </h2>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  clearCart()
                  window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
                }}
                className="px-3 py-1.5 rounded-lg text-sm text-rose-500 hover:bg-rose-50 transition-colors"
              >
                Очистить
              </motion.button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-100 text-surface-500"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-180px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-5 text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-surface-100 mb-4">
                <CreditCard size={32} className="text-surface-400" />
              </div>
              <p className="text-[var(--tg-theme-hint-color)]">
                Корзина пуста
              </p>
              <p className="text-sm text-surface-400 mt-1">
                Добавьте товары из каталога
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  onRemove={() => removeFromCart(item.id)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 inset-x-0 p-4 bg-[var(--tg-theme-bg-color)] border-t border-surface-100 safe-bottom">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[var(--tg-theme-hint-color)]">Итого</span>
              <span className="text-xl font-bold text-[var(--tg-theme-text-color)]">
                {formatPrice(total)}
              </span>
            </div>
            
            {/* Checkout button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-semibold shadow-lg shadow-primary-500/25"
            >
              <ShieldCheck size={20} weight="bold" />
              Оформить заказ
            </motion.button>
            
            {/* Demo notice */}
            <p className="text-xs text-center text-surface-400 mt-3">
              Демо-режим. Оплата не будет произведена.
            </p>
          </div>
        )}
      </motion.div>
    </>
  )
}

function CartItem({ item, onUpdateQuantity, onRemove, formatPrice }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-3 p-3 bg-surface-50 rounded-2xl"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[var(--tg-theme-text-color)] line-clamp-1 mb-1">
          {item.name}
        </h4>
        <p className="text-sm font-bold text-[var(--tg-theme-text-color)] mb-2">
          {formatPrice(item.price)}
        </p>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white rounded-lg p-0.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onUpdateQuantity(item.quantity - 1)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
              className="w-7 h-7 flex items-center justify-center rounded-md text-surface-500 hover:bg-surface-100"
            >
              <Minus size={14} weight="bold" />
            </motion.button>
            <span className="w-6 text-center text-sm font-semibold text-[var(--tg-theme-text-color)]">
              {item.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onUpdateQuantity(item.quantity + 1)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
              className="w-7 h-7 flex items-center justify-center rounded-md text-surface-500 hover:bg-surface-100"
            >
              <Plus size={14} weight="bold" />
            </motion.button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onRemove()
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <Trash size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
