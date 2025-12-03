import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBar, 
  Package, 
  Users, 
  ShoppingCart,
  Megaphone,
  Gear,
  Wallet,
  TrendUp,
  CaretRight,
  Plus,
  Eye,
  PencilSimple,
  Trash,
  MagnifyingGlass,
  Export,
  ArrowLeft,
  Check,
  X as XIcon,
  Bell,
  Crown
} from '@phosphor-icons/react'

// Демо-данные
const DEMO_STATS = {
  today: { orders: 12, revenue: 47800, clients: 8, avgCheck: 3983 },
  week: { orders: 67, revenue: 284500, clients: 45, avgCheck: 4246 },
  month: { orders: 234, revenue: 1124000, clients: 156, avgCheck: 4803 },
}

const DEMO_ORDERS = [
  { id: '10236', amount: 4990, user: '@demo_user', product: 'Основы маркетинга', time: '5 мин', status: 'new' },
  { id: '10235', amount: 14990, user: '@client_test', product: 'SMM с нуля до PRO', time: '12 мин', status: 'new' },
  { id: '10234', amount: 2480, user: '@buyer_demo', product: 'Контент-план', time: '28 мин', status: 'new' },
]

const DEMO_PRODUCTS = [
  { id: 1, name: 'Основы маркетинга', price: 4990, sales: 45, category: 'Курсы', badge: 'ХИТ' },
  { id: 2, name: 'SMM с нуля до PRO', price: 14990, sales: 28, category: 'Курсы' },
  { id: 3, name: 'Консультация 60 мин', price: 4000, sales: 32, category: 'Услуги', badge: 'ХИТ' },
  { id: 4, name: 'Шаблоны Canva', price: 1490, sales: 67, category: 'Цифровые' },
  { id: 5, name: 'PRO подписка', price: 2990, sales: 29, category: 'Подписки', badge: 'ХИТ' },
]

const DEMO_USERS = [
  { id: 1, name: '@premium_client', orders: 12, spent: 89400, vip: true },
  { id: 2, name: '@loyal_buyer', orders: 8, spent: 67200, vip: true },
  { id: 3, name: '@regular_user', orders: 3, spent: 12500, vip: false },
]

export default function AdminPage({ onBack }) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [statsPeriod, setStatsPeriod] = useState('today')

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection stats={DEMO_STATS} period={statsPeriod} setPeriod={setStatsPeriod} formatPrice={formatPrice} />
      case 'orders':
        return <OrdersSection orders={DEMO_ORDERS} formatPrice={formatPrice} />
      case 'products':
        return <ProductsSection products={DEMO_PRODUCTS} formatPrice={formatPrice} />
      case 'users':
        return <UsersSection users={DEMO_USERS} formatPrice={formatPrice} />
      case 'broadcast':
        return <BroadcastSection />
      case 'settings':
        return <SettingsSection />
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
              Демо-режим администратора
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Crown size={14} weight="fill" className="text-amber-500" />
            <span className="text-xs font-medium text-amber-500">Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'dashboard', label: 'Обзор', icon: ChartBar },
            { id: 'orders', label: 'Заказы', icon: ShoppingCart, badge: 3 },
            { id: 'products', label: 'Товары', icon: Package },
            { id: 'users', label: 'Клиенты', icon: Users },
            { id: 'broadcast', label: 'Рассылка', icon: Megaphone },
            { id: 'settings', label: 'Настройки', icon: Gear },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-[var(--tg-theme-button-color)] text-white' 
                    : 'bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)]'
                  }
                `}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                {item.label}
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
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
            Это демонстрация админ-панели. Данные не сохраняются.
          </p>
        </div>
      </div>
    </div>
  )
}

// === Dashboard Section ===
function DashboardSection({ stats, period, setPeriod, formatPrice }) {
  const currentStats = stats[period]
  
  return (
    <div className="px-4 space-y-4">
      {/* Period selector */}
      <div className="flex gap-2">
        {[
          { id: 'today', label: 'Сегодня' },
          { id: 'week', label: 'Неделя' },
          { id: 'month', label: 'Месяц' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              period === p.id 
                ? 'bg-[var(--tg-theme-button-color)] text-white' 
                : 'bg-[var(--surface-bg)] text-[var(--tg-theme-hint-color)]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={ShoppingCart} 
          label="Заказов" 
          value={currentStats.orders}
          trend="+25%"
          color="blue"
        />
        <StatCard 
          icon={Wallet} 
          label="Выручка" 
          value={formatPrice(currentStats.revenue)}
          trend="+18%"
          color="green"
        />
        <StatCard 
          icon={Users} 
          label="Клиентов" 
          value={currentStats.clients}
          trend="+33%"
          color="purple"
        />
        <StatCard 
          icon={TrendUp} 
          label="Средний чек" 
          value={formatPrice(currentStats.avgCheck)}
          trend="+5%"
          color="orange"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)] mb-3">
          Быстрые действия
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton icon={Plus} label="Добавить товар" />
          <ActionButton icon={Megaphone} label="Рассылка" />
          <ActionButton icon={Export} label="Экспорт" />
          <ActionButton icon={Bell} label="Уведомления" />
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
            Новые заказы
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-medium">
            3 новых
          </span>
        </div>
        <div className="space-y-2">
          {DEMO_ORDERS.slice(0, 3).map((order) => (
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

function StatCard({ icon: Icon, label, value, trend, color }) {
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
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-[var(--tg-theme-hint-color)]">{label}</p>
        <span className="text-xs font-medium text-emerald-500">{trend}</span>
      </div>
    </div>
  )
}

function ActionButton({ icon: Icon, label }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] text-sm font-medium"
    >
      <Icon size={18} />
      {label}
    </motion.button>
  )
}

// === Orders Section ===
function OrdersSection({ orders, formatPrice }) {
  const [filter, setFilter] = useState('new')
  
  return (
    <div className="px-4 space-y-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {[
          { id: 'new', label: 'Новые', count: 3, color: 'blue' },
          { id: 'progress', label: 'В работе', count: 5, color: 'yellow' },
          { id: 'done', label: 'Выполнены', count: 218, color: 'green' },
          { id: 'cancelled', label: 'Отменены', count: 8, color: 'red' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.id 
                ? 'bg-[var(--tg-theme-button-color)] text-white' 
                : 'bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)]'
            }`}
          >
            {f.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              filter === f.id ? 'bg-white/20' : 'bg-[var(--tg-theme-hint-color)]/20'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  )
}

function OrderCard({ order, formatPrice }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--tg-theme-text-color)]">#{order.id}</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-medium">
              Новый
            </span>
          </div>
          <p className="text-xs text-[var(--tg-theme-hint-color)] mt-0.5">{order.time} назад</p>
        </div>
        <span className="text-lg font-bold text-[var(--tg-theme-text-color)]">
          {formatPrice(order.amount)}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-3 text-sm text-[var(--tg-theme-text-color)]">
        <span className="text-[var(--tg-theme-hint-color)]">Клиент:</span>
        <span className="font-medium">{order.user}</span>
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-sm text-[var(--tg-theme-text-color)]">
        <span className="text-[var(--tg-theme-hint-color)]">Товар:</span>
        <span className="font-medium">{order.product}</span>
      </div>
      
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium"
        >
          <Check size={16} weight="bold" />
          Подтвердить
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] text-sm font-medium"
        >
          <XIcon size={16} weight="bold" />
          Отклонить
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
          placeholder="Поиск товаров..."
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] outline-none"
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
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-[var(--surface-bg)]">
            <Trash size={16} className="text-rose-500" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// === Users Section ===
function UsersSection({ users, formatPrice }) {
  return (
    <div className="px-4 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--surface-border)] p-3 text-center">
          <p className="text-lg font-bold text-[var(--tg-theme-text-color)]">1 247</p>
          <p className="text-xs text-[var(--tg-theme-hint-color)]">Всего</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--surface-border)] p-3 text-center">
          <p className="text-lg font-bold text-[var(--tg-theme-text-color)]">312</p>
          <p className="text-xs text-[var(--tg-theme-hint-color)]">Покупатели</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--surface-border)] p-3 text-center">
          <p className="text-lg font-bold text-[var(--tg-theme-text-color)]">45</p>
          <p className="text-xs text-[var(--tg-theme-hint-color)]">VIP</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-theme-hint-color)]" />
        <input
          type="text"
          placeholder="Поиск клиентов..."
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-[var(--surface-bg)] text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] outline-none"
        />
      </div>

      {/* Users list */}
      <div className="space-y-3">
        {users.map((user) => (
          <UserRow key={user.id} user={user} formatPrice={formatPrice} />
        ))}
      </div>
    </div>
  )
}

function UserRow({ user, formatPrice }) {
  return (
    <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--surface-bg)] flex items-center justify-center">
          <Users size={20} className="text-[var(--tg-theme-hint-color)]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--tg-theme-text-color)]">{user.name}</span>
            {user.vip && (
              <Crown size={14} weight="fill" className="text-amber-500" />
            )}
          </div>
          <p className="text-xs text-[var(--tg-theme-hint-color)]">
            {user.orders} заказов • {formatPrice(user.spent)}
          </p>
        </div>
        <CaretRight size={18} className="text-[var(--tg-theme-hint-color)]" />
      </div>
    </div>
  )
}

// === Broadcast Section ===
function BroadcastSection() {
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
            <p className="font-bold text-[var(--tg-theme-text-color)]">99.3%</p>
          </div>
          <div>
            <p className="text-[var(--tg-theme-hint-color)]">Открыто</p>
            <p className="font-bold text-[var(--tg-theme-text-color)]">76.7%</p>
          </div>
          <div>
            <p className="text-[var(--tg-theme-hint-color)]">Кликов</p>
            <p className="font-bold text-[var(--tg-theme-text-color)]">20.5%</p>
          </div>
        </div>
      </div>

      {/* Create broadcast */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--tg-theme-button-color)] text-white font-medium"
      >
        <Megaphone size={20} weight="fill" />
        Создать рассылку
      </motion.button>

      {/* Segments */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] p-4">
        <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)] mb-3">
          Сегменты
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Все пользователи', count: 1247 },
            { label: 'Покупатели', count: 312 },
            { label: 'Новые (7 дней)', count: 89 },
            { label: 'VIP клиенты', count: 45 },
          ].map((seg) => (
            <div key={seg.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-bg)]">
              <span className="text-sm text-[var(--tg-theme-text-color)]">{seg.label}</span>
              <span className="text-sm font-medium text-[var(--tg-theme-hint-color)]">{seg.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// === Settings Section ===
function SettingsSection() {
  return (
    <div className="px-4 space-y-4">
      {/* Shop settings */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--surface-border)]">
          <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
            Настройки магазина
          </h3>
        </div>
        <div className="divide-y divide-[var(--surface-border)]">
          <SettingRow label="Название" value="Demo Shop" />
          <SettingRow label="Валюта" value="₽ (RUB)" />
          <SettingRow label="Часовой пояс" value="UTC+3 (Москва)" />
          <SettingRow label="Язык" value="Русский" />
        </div>
      </div>

      {/* Payment */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--surface-border)]">
          <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
            Способы оплаты
          </h3>
        </div>
        <div className="divide-y divide-[var(--surface-border)]">
          <SettingRow label="ЮKassa" value="✅ Активна" />
          <SettingRow label="Stripe" value="⚪ Не настроена" />
          <SettingRow label="Криптовалюта" value="⚪ Не настроена" />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--surface-border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--surface-border)]">
          <h3 className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
            Уведомления
          </h3>
        </div>
        <div className="divide-y divide-[var(--surface-border)]">
          <ToggleRow label="Новый заказ" defaultChecked />
          <ToggleRow label="Оплата получена" defaultChecked />
          <ToggleRow label="Новый клиент" defaultChecked />
          <ToggleRow label="Отзывы" defaultChecked={false} />
        </div>
      </div>
    </div>
  )
}

function SettingRow({ label, value }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-[var(--tg-theme-text-color)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--tg-theme-hint-color)]">{value}</span>
        <CaretRight size={16} className="text-[var(--tg-theme-hint-color)]" />
      </div>
    </div>
  )
}

function ToggleRow({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked)
  
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-[var(--tg-theme-text-color)]">{label}</span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setChecked(!checked)}
        className={`w-12 h-7 rounded-full p-1 transition-colors ${
          checked ? 'bg-[var(--tg-theme-button-color)]' : 'bg-[var(--surface-bg)]'
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white shadow-md"
        />
      </motion.button>
    </div>
  )
}
