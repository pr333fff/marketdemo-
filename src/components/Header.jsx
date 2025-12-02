import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useStore } from '../store'

export default function Header() {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const { searchQuery, setSearchQuery } = useStore()

  return (
    <header className="sticky top-0 z-40 bg-[var(--tg-theme-bg-color)]/80 backdrop-blur-xl border-b border-[var(--surface-border)]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {!isSearchOpen ? (
            <>
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-[var(--tg-theme-text-color)]">
                  Demo Shop
                </h1>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">
                  Каталог товаров и услуг
                </p>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] hover:opacity-80 transition-opacity"
              >
                <MagnifyingGlass size={20} weight="bold" />
              </motion.button>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 flex items-center gap-2"
            >
              <div className="flex-1 relative">
                <MagnifyingGlass 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-theme-hint-color)]" 
                />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] outline-none focus:ring-2 focus:ring-blue-500/20 transition-shadow"
                />
              </div>
              
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery('')
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--tg-theme-hint-color)] hover:opacity-80 transition-opacity"
              >
                <X size={20} weight="bold" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
