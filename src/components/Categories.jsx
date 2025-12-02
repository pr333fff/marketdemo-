import { motion } from 'framer-motion'
import { useStore } from '../store'

export default function Categories() {
  const { categories, activeCategory, setActiveCategory } = useStore()

  return (
    <div className="sticky top-[61px] z-30 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-xl">
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <CategoryChip
            label="Все"
            isActive={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoryChip({ label, isActive, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium
        transition-colors duration-200
        ${isActive 
          ? 'text-white' 
          : 'text-[var(--tg-theme-text-color)] bg-[var(--surface-bg)] hover:opacity-80'
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 bg-[var(--tg-theme-button-color)] rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}
