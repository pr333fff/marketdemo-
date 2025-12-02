import { motion } from 'framer-motion'
import { Minus, Plus, Trash, ShoppingBag, ShieldCheck, ArrowRight } from '@phosphor-icons/react'
import { useStore } from '../store'
import ProductIcon from './ProductIcon'

export default function CartPage() {
  const { cart, getCartTotal, updateQuantity, removeFromCart, clearCart } = useStore()
  const total = getCartTotal()

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const handleCheckout = () => {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success')
    
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
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-[var(--tg-theme-text-color)]">
          Корзина
        </h1>
        {cart.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              clearCart()
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
            }}
            className="text-sm text-rose-500 font-medium"
          >
            Очистить
          </motion.button>
        )}
      </div>
      
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Cart items */}
          <div className="px-4 space-y-3 mb-6">
            {cart.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                index={index}
                onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                onRemove={() => removeFromCart(item.id)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
          
          {/* Summary */}
          <div className="px-4">
            <div className="p-5 rounded-3xl bg-[var(--card-bg)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--tg-theme-hint-color)]">Товаров</span>
                <span className="text-sm text-[var(--tg-theme-text-color)]">{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--surface-border)]">
                <span className="text-sm text-[var(--tg-theme-hint-color)]">Скидка</span>
                <span className="text-sm text-emerald-600">−{formatPrice(Math.round(total * 0.1))}</span>
              </div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-semibold text-[var(--tg-theme-text-color)]">Итого</span>
                <span className="text-xl font-bold text-[var(--tg-theme-text-color)]">{formatPrice(total)}</span>
              </div>
              
              {/* Checkout button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-semibold shadow-lg"
              >
                Оформить заказ
                <ArrowRight size={20} weight="bold" />
              </motion.button>
              
              {/* Security note */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <ShieldCheck size={16} className="text-[var(--tg-theme-hint-color)]" />
                <span className="text-xs text-[var(--tg-theme-hint-color)]">Безопасная оплата</span>
              </div>
            </div>
          </div>
          
          {/* Demo notice */}
          <div className="px-4 mt-4">
            <p className="text-xs text-center text-[var(--tg-theme-hint-color)]">
              Демо-режим. Реальная оплата не производится.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16">
      <div className="w-24 h-24 rounded-3xl bg-[var(--surface-bg)] flex items-center justify-center mb-6">
        <ShoppingBag size={40} className="text-[var(--tg-theme-hint-color)]" />
      </div>
      <h2 className="text-lg font-semibold text-[var(--tg-theme-text-color)] mb-2">
        Корзина пуста
      </h2>
      <p className="text-sm text-[var(--tg-theme-hint-color)] text-center mb-6">
        Добавьте товары из каталога,<br />чтобы оформить заказ
      </p>
    </div>
  )
}

function CartItem({ item, index, onUpdateQuantity, onRemove, formatPrice }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 p-4 bg-[var(--card-bg)] rounded-2xl"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <ProductIcon categoryId={item.categoryId} size="sm" />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[var(--tg-theme-text-color)] line-clamp-1 mb-1">
          {item.name}
        </h4>
        <p className="text-sm font-bold text-[var(--tg-theme-text-color)] mb-3">
          {formatPrice(item.price * item.quantity)}
        </p>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-[var(--surface-bg)] rounded-xl p-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onUpdateQuantity(item.quantity - 1)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--tg-theme-hint-color)] hover:opacity-80"
            >
              <Minus size={16} weight="bold" />
            </motion.button>
            <span className="w-8 text-center text-sm font-semibold text-[var(--tg-theme-text-color)]">
              {item.quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onUpdateQuantity(item.quantity + 1)
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--tg-theme-hint-color)] hover:opacity-80"
            >
              <Plus size={16} weight="bold" />
            </motion.button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              onRemove()
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <Trash size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
