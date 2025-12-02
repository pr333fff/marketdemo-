import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Plus, Heart } from '@phosphor-icons/react'
import { useStore } from '../store'
import ProductIcon from './ProductIcon'

export default function ProductGrid() {
  const { getFilteredProducts, setSelectedProduct, addToCart, searchQuery } = useStore()
  const products = getFilteredProducts()

  if (products.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-[var(--tg-theme-hint-color)]">
          {searchQuery ? 'Ничего не найдено' : 'Товары не найдены'}
        </p>
      </div>
    )
  }

  return (
    <div className="px-3 py-3">
      <motion.div 
        layout
        className="grid grid-cols-3 max-[380px]:grid-cols-2 gap-2"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onSelect={() => setSelectedProduct(product)}
            onAddToCart={(e) => {
              e.stopPropagation()
              addToCart(product)
              window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function ProductCard({ product, index, onSelect, onAddToCart }) {
  const [isFavorite, setFavorite] = useState(false)
  
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }
  
  const handleFavorite = (e) => {
    e.stopPropagation()
    setFavorite(!isFavorite)
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      onClick={onSelect}
      className="group relative bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-card cursor-pointer active:scale-[0.98] transition-transform duration-150"
    >
      {/* Icon instead of image */}
      <div className="relative overflow-hidden">
        <ProductIcon categoryId={product.categoryId} productId={product.id} size="sm" />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wide bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
            {product.badge}
          </div>
        )}
        
        {/* Favorite button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleFavorite}
          className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <Heart 
            size={14} 
            weight={isFavorite ? 'fill' : 'regular'} 
            className={isFavorite ? 'text-rose-500' : 'text-slate-400'}
          />
        </motion.button>
        
        {/* Add button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onAddToCart}
          className="absolute bottom-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm"
        >
          <Plus size={14} weight="bold" />
        </motion.button>
      </div>
      
      {/* Content */}
      <div className="p-2">
        <h3 className="text-xs font-medium text-[var(--tg-theme-text-color)] line-clamp-1 mb-0.5">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1">
          <Star size={10} weight="fill" className="text-amber-400" />
          <span className="text-[10px] font-medium text-[var(--tg-theme-text-color)]">
            {product.rating}
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-xs font-bold text-[var(--tg-theme-text-color)]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] text-[var(--tg-theme-hint-color)] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
