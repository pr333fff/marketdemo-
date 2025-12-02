import { motion } from 'framer-motion'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Star,
  Gift,
  Bell,
  Gear,
  CaretRight,
  Crown
} from '@phosphor-icons/react'

export default function ProfilePage() {
  // Демо-данные пользователя
  const user = {
    name: 'Пользователь',
    username: '@demo_user',
    level: 'Gold',
    bonusPoints: 1250,
    ordersCount: 12,
    totalSpent: 47800,
    favoritesCount: 5,
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-[var(--tg-theme-text-color)]">
          Профиль
        </h1>
      </div>
      
      {/* User card */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white blur-3xl" />
          </div>
          
          <div className="relative">
            {/* Avatar & Info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <User size={28} weight="fill" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-white/60">{user.username}</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                <Crown size={14} weight="fill" className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400">{user.level}</span>
              </div>
            </div>
            
            {/* Bonus points */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Gift size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Бонусные баллы</p>
                  <p className="text-lg font-bold">{user.bonusPoints.toLocaleString()}</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-white/10 text-sm font-medium hover:bg-white/20 transition-colors">
                Потратить
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <StatCard 
            icon={ShoppingBag} 
            label="Заказов" 
            value={user.ordersCount}
            color="bg-blue-500"
          />
          <StatCard 
            icon={Star} 
            label="Потрачено" 
            value={formatPrice(user.totalSpent)}
            color="bg-emerald-500"
            small
          />
          <StatCard 
            icon={Heart} 
            label="Избранное" 
            value={user.favoritesCount}
            color="bg-rose-500"
          />
        </div>
      </div>
      
      {/* Menu */}
      <div className="px-4">
        <div className="bg-surface-50 rounded-2xl overflow-hidden">
          <MenuItem 
            icon={ShoppingBag} 
            label="Мои заказы" 
            subtitle="История покупок"
          />
          <MenuItem 
            icon={Heart} 
            label="Избранное" 
            subtitle="Сохранённые товары"
          />
          <MenuItem 
            icon={Bell} 
            label="Уведомления" 
            subtitle="Настройки оповещений"
          />
          <MenuItem 
            icon={Gear} 
            label="Настройки" 
            subtitle="Параметры аккаунта"
            isLast
          />
        </div>
      </div>
      
      {/* Demo notice */}
      <div className="px-4 mt-6">
        <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100">
          <p className="text-sm text-primary-700 text-center">
            Это демо-профиль для демонстрации возможностей приложения
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, small }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-2xl bg-surface-50"
    >
      <div className={`w-10 h-10 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-3`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
      <p className={`font-bold text-[var(--tg-theme-text-color)] ${small ? 'text-sm' : 'text-lg'}`}>
        {value}
      </p>
      <p className="text-xs text-[var(--tg-theme-hint-color)] mt-0.5">{label}</p>
    </motion.div>
  )
}

function MenuItem({ icon: Icon, label, subtitle, isLast }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-4 p-4 text-left hover:bg-surface-100 transition-colors ${
        !isLast ? 'border-b border-surface-100' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
        <Icon size={20} className="text-[var(--tg-theme-text-color)]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--tg-theme-text-color)]">{label}</p>
        <p className="text-xs text-[var(--tg-theme-hint-color)]">{subtitle}</p>
      </div>
      <CaretRight size={18} className="text-surface-400" />
    </motion.button>
  )
}
