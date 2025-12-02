import { motion } from 'framer-motion'
import { X, Star, Minus, Plus, ShoppingBag, ShieldCheck, Clock, ChatCircle } from '@phosphor-icons/react'
import { useStore } from '../store'
import ProductIcon from './ProductIcon'

export default function ProductModal({ product, onClose }) {
  const { addToCart, cart } = useStore()
  
  const cartItem = cart.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0
  
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }
  
  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0

  const handleAddToCart = () => {
    addToCart(product)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
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
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-[var(--tg-theme-bg-color)] rounded-t-3xl max-h-[90vh] overflow-hidden"
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 rounded-full bg-surface-300" />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-surface-500 z-10 shadow-sm"
        >
          <X size={18} weight="bold" />
        </button>
        
        <div className="overflow-y-auto max-h-[calc(90vh-20px)] pb-safe">
          {/* Icon instead of image */}
          <div className="relative overflow-hidden">
            <ProductIcon categoryId={product.categoryId} productId={product.id} size="lg" />
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
                {product.badge}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="px-5 py-4">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg">
                <Star size={14} weight="fill" className="text-amber-500" />
                <span className="text-sm font-semibold text-amber-700">{product.rating}</span>
              </div>
              <span className="text-sm text-[var(--tg-theme-hint-color)]">
                {product.reviews} отзывов
              </span>
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-[var(--tg-theme-text-color)] mb-2">
              {product.name}
            </h2>
            
            {/* Description */}
            <p className="text-sm text-[var(--tg-theme-hint-color)] mb-4 leading-relaxed">
              {product.description}
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <FeatureItem icon={ShieldCheck} text="Гарантия" />
              <FeatureItem icon={Clock} text="Быстрый доступ" />
              <FeatureItem icon={ChatCircle} text="Поддержка" />
            </div>
            
            {/* Price section */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[var(--tg-theme-text-color)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-base text-surface-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <span className="text-sm text-emerald-600 font-medium">
                    Выгода {discount}%
                  </span>
                )}
              </div>
              
              {quantity > 0 && (
                <div className="flex items-center gap-2 bg-surface-100 rounded-xl p-1">
                  <QuantityButton 
                    icon={Minus} 
                    onClick={() => useStore.getState().updateQuantity(product.id, quantity - 1)} 
                  />
                  <span className="w-8 text-center font-semibold text-[var(--tg-theme-text-color)]">
                    {quantity}
                  </span>
                  <QuantityButton 
                    icon={Plus} 
                    onClick={() => useStore.getState().updateQuantity(product.id, quantity + 1)} 
                  />
                </div>
              )}
            </div>
            
            {/* Add to cart button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] font-semibold text-base shadow-lg shadow-primary-500/25"
            >
              <ShoppingBag size={20} weight="bold" />
              {quantity > 0 ? 'Добавить ещё' : 'Добавить в корзину'}
            </motion.button>
            
            {/* Bottom safe area */}
            <div className="h-4" />
          </div>
        </div>
      </motion.div>
    </>
  )
}

function FeatureItem({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 bg-surface-50 rounded-xl">
      <Icon size={20} className="text-[var(--tg-theme-button-color)]" />
      <span className="text-[11px] text-[var(--tg-theme-hint-color)] text-center">{text}</span>
    </div>
  )
}

function QuantityButton({ icon: Icon, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
      }}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-[var(--tg-theme-text-color)]"
    >
      <Icon size={16} weight="bold" />
    </motion.button>
  )
}
