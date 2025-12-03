import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBar, 
  Package, 
  ShoppingCart,
  Megaphone,
  Wallet,
  TrendUp,
  Plus,
  Eye,
  PencilSimple,
  MagnifyingGlass,
  ArrowLeft,
  Check,
  X as XIcon,
  Crown,
  Users
} from '@phosphor-icons/react'

// Демо-данные
const DEMO_STATS = {
  orders: 12, 
  revenue: 47800, 
  clients: 8, 
  avgCheck: 3983
}

const DEMO_ORDERS = [
  { id: '10236', amount: 4990, user: '@demo_user', product: 'Основы маркетинга', time: '5 мин', status: 'new' },
  { id: '10235', amount: 14990, user: '@client_test', product: 'SMM с нуля до PRO', time: '12 мин', status: 'new' },
  { id: '10234', amount: 2480, user: '@buyer_demo', product: 'Контент-план', time: '28 мин', status: 'progress' },
]

const DEMO_PRODUCTS = [
  { id: 1, name: 'Основы маркетинга', price: 4990, sales: 45, category: 'Курсы', badge: 'ХИТ' },
  { id: 2, name: 'SMM с нуля до PRO', price: 14990, sales: 28, category: 'Курсы' },
  { id: 3, name: 'Консультация 60 мин', price: 4000, sales: 32, category: 'Услуги', badge: 'ХИТ' },
  { id: 4, name: 'Шаблоны Canva', price: 1490, sales: 67, category: 'Цифровые' },
]

export default function AdminPage({ onBack }) {
  const [activeSection, setActiveSection] = useState('dashboard')

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection stats={DEMO_STATS} formatPrice={formatPrice} />
      case 'orders':
        return <OrdersSection orders={DEMO_ORDERS} formatPrice={formatPrice} />
      case 'products':
        return <ProductsSection products={DEMO_PRODUCTS} formatPrice={formatPrice} />
      case 'broadcast':
        return <BroadcastSection />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--tg-theme-bg-color)]/95 backdrop-blur-xl border-b border-[var(--surface-border)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--surface-bg)]"
          >
            <ArrowLeft size={20} className="text-[var(--tg-theme-text-color)]" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[var(--tg-theme-text-color)]">
              Панель управления
            </h1>
            <p className="text-xs text-[var(--tg-theme-hint-color)]">
              Демо-режим
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Crown size={14} weight="fill" className="text-amber-500" />
            <span className="text-xs font-medium text-amber-500">Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation - 4 tabs */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'dashboard', label: 'Обзор', icon: ChartBar },
            { id: 'orders', label: 'Заказы', icon: ShoppingCart, badge: 2 },
            { id: 'products', label: 'Товары', icon: Package },
            { id: 'broadcast', label: 'Рассылка', icon: Megaphone },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs font-medium transition-all
                  ${isActive 
                    ? 'bg-[var(--tg-theme-button-color)] text-white' 
                    : 'bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)]'
                  }
                `}
              >
                <div className="relative">
                  <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Demo notice */}
      <div className="px-4 mt-6">
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-blue-400 text-center">
            🎭 Демонстрация админ-панели
          </p>
        </div>
      </div>
    </div>
  )
}

// === Dashboard Section ===
function DashboardSection({ stats, formatPrice }) {
  return (
    <div className="px-4 space-y-4">
      <h2 className="text-sm font-semibold text-[var(--tg-theme-hint-color)]">
        Статистика за сегодня
      </h2>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={ShoppingCart} 
          label="Заказов" 
          value={stats.orders}
          color="blue"
        />
        <StatCard 
          icon={Wallet} 
          label="Выручка" 
          value={formatPrice(stats.revenue)}
          color="green"
        />
        <StatCard 
          icon={Users} 
          label="Клиентов" 
          value={stats.clients}
          color="purple"
        />
        <StatCard 
          icon={TrendUp} 
          label="Ср. чек" 
          value={formatPrice(stats.avgCheck)}
          color="orange"
        />
      </div>

      {/* Recent orders */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
            Новые заказы
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-medium">
            2 новых
          </span>
        </div>
        <div className="space-y-2">
          {DEMO_ORDERS.filter(o => o.status === 'new').map((order) => (
            <div key={order.id} className="flex items-center gap-3 p-2 rounded-xl bg-[var(--surface-bg)]">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--tg-theme-text-color)] truncate">
                  #{order.id} — {order.product}
                </p>
                <p className="text-xs text-[var(--tg-theme-hint-color)]">
                  {order.user} • {order.time} назад
                </p>
              </div>
              <span className="text-sm font-bold text-[var(--tg-theme-text-color)]">
                {formatPrice(order.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-emerald-500/10 text-emerald-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-orange-500/10 text-orange-500',
  }
  
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-3`}>
        <Icon size={20} weight="fill" />
      </div>
      <p className="text-lg font-bold text-[var(--tg-theme-text-color)]">{value}</p>
      <p className="text-xs text-[var(--tg-theme-hint-color)] mt-1">{label}</p>
    </div>
  )
}

// === Orders Section ===
function OrdersSection({ orders, formatPrice }) {
  const [filter, setFilter] = useState('new')
  
  const filteredOrders = orders.filter(o => {
    if (filter === 'new') return o.status === 'new'
    if (filter === 'progress') return o.status === 'progress'
    return true
  })

  return (
    <div className="px-4 space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: 'new', label: 'Новые', count: 2 },
          { id: 'progress', label: 'В работе', count: 1 },
          { id: 'done', label: 'Выполнены', count: 218 },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.id 
                ? 'bg-[var(--tg-theme-button-color)] text-white' 
                : 'bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)]'
            }`}
          >
            {f.label}
            <span className={`text-xs ${filter === f.id ? 'opacity-70' : 'opacity-50'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} formatPrice={formatPrice} />
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-[var(--tg-theme-hint-color)] text-sm">
            Нет заказов
          </div>
        )}
      </div>
    </div>
  )
}

function OrderCard({ order, formatPrice }) {
  const statusColors = {
    new: 'bg-blue-500/10 text-blue-500',
    progress: 'bg-amber-500/10 text-amber-500',
  }
  const statusLabels = {
    new: 'Новый',
    progress: 'В работе',
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--tg-theme-text-color)]">#{order.id}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>
          <p className="text-xs text-[var(--tg-theme-hint-color)] mt-0.5">{order.time} назад</p>
        </div>
        <span className="text-lg font-bold text-[var(--tg-theme-text-color)]">
          {formatPrice(order.amount)}
        </span>
      </div>
      
      <div className="text-sm text-[var(--tg-theme-text-color)] mb-4">
        <span className="text-[var(--tg-theme-hint-color)]">{order.user}</span>
        <span className="mx-2">•</span>
        <span>{order.product}</span>
      </div>
      
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium"
        >
          <Check size={16} weight="bold" />
          Выполнен
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] text-sm font-medium"
        >
          <XIcon size={16} weight="bold" />
          Отмена
        </motion.button>
      </div>
    </div>
  )
}

// === Products Section ===
function ProductsSection({ products, formatPrice }) {
  return (
    <div className="px-4 space-y-4">
      {/* Add button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--tg-theme-button-color)] text-white font-medium"
      >
        <Plus size={20} weight="bold" />
        Добавить товар
      </motion.button>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-theme-hint-color)]" />
        <input
          type="text"
          placeholder="Поиск..."
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] outline-none border-none"
        />
      </div>

      {/* Products list */}
      <div className="space-y-3">
        {products.map((product) => (
          <ProductRow key={product.id} product={product} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  )
}

function ProductRow({ product, formatPrice }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--tg-theme-text-color)]">{product.name}</span>
            {product.badge && (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--tg-theme-hint-color)] mt-0.5">{product.category}</p>
        </div>
        <span className="text-sm font-bold text-[var(--tg-theme-text-color)]">
          {formatPrice(product.price)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--tg-theme-hint-color)]">
          Продаж: <span className="font-medium text-[var(--tg-theme-text-color)]">{product.sales}</span>
        </span>
        <div className="flex gap-1">
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-[var(--surface-bg)]">
            <Eye size={16} className="text-[var(--tg-theme-hint-color)]" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-[var(--surface-bg)]">
            <PencilSimple size={16} className="text-[var(--tg-theme-hint-color)]" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// === Broadcast Section ===
function BroadcastSection() {
  const [message, setMessage] = useState('')
  
  return (
    <div className="px-4 space-y-4">
      {/* Stats */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)] mb-3">
          Последняя рассылка
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-[var(--tg-theme-hint-color)]">Отправлено</p>
            <p className="font-bold text-[var(--tg-theme-text-color)]">1 150</p>
          </div>
          <div>
            <p className="text-[var(--tg-theme-hint-color)]">Доставлено</p>
            <p className="font-bold text-emerald-500">99.3%</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)] mb-3">
          Новая рассылка
        </h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите текст сообщения..."
          className="w-full h-24 p-3 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] outline-none resize-none border-none text-sm"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[var(--tg-theme-hint-color)]">
            Получателей: 1 247
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--tg-theme-button-color)] text-white text-sm font-medium"
          >
            <Megaphone size={16} weight="fill" />
            Отправить
          </motion.button>
        </div>
      </div>
    </div>
  )
}
