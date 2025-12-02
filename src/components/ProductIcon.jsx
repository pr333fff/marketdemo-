import { 
  GraduationCap, 
  ChatsCircle, 
  FileText, 
  CrownSimple,
  Lightbulb,
  Rocket,
  Target,
  TrendUp
} from '@phosphor-icons/react'

// Цветовые схемы для категорий
const categoryStyles = {
  1: { // Онлайн-курсы
    bg: 'from-violet-500 to-purple-600',
    icon: GraduationCap,
    pattern: 'circles',
  },
  2: { // Консультации
    bg: 'from-sky-500 to-blue-600',
    icon: ChatsCircle,
    pattern: 'waves',
  },
  3: { // Цифровые товары
    bg: 'from-emerald-500 to-teal-600',
    icon: FileText,
    pattern: 'dots',
  },
  4: { // Подписки
    bg: 'from-amber-500 to-orange-600',
    icon: CrownSimple,
    pattern: 'lines',
  },
}

// Дополнительные иконки для разнообразия
const accentIcons = [Lightbulb, Rocket, Target, TrendUp]

export default function ProductIcon({ categoryId, productId = 0, size = 'md' }) {
  const style = categoryStyles[categoryId] || categoryStyles[1]
  const Icon = style.icon
  const AccentIcon = accentIcons[productId % accentIcons.length]
  
  const sizeClasses = {
    sm: 'w-full aspect-square',
    md: 'w-full aspect-[4/3]',
    lg: 'w-full aspect-[16/10]',
  }
  
  const iconSizes = {
    sm: 24,
    md: 36,
    lg: 48,
  }

  return (
    <div className={`relative ${sizeClasses[size]} bg-gradient-to-br ${style.bg} overflow-hidden`}>
      {/* Background pattern */}
      <Pattern type={style.pattern} />
      
      {/* Main icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <Icon 
            size={iconSizes[size]} 
            weight="duotone" 
            className="text-white/90"
          />
        </div>
      </div>
      
      {/* Accent icon */}
      <div className="absolute top-3 right-3 opacity-30">
        <AccentIcon size={size === 'sm' ? 16 : 24} weight="bold" className="text-white" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/10 blur-xl" />
    </div>
  )
}

function Pattern({ type }) {
  switch (type) {
    case 'circles':
      return (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-white" />
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full border border-white" />
          <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-white/20" />
        </div>
      )
    case 'waves':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" fill="white" />
          <path d="M0,60 Q25,40 50,60 T100,60 V100 H0 Z" fill="white" opacity="0.5" />
        </svg>
      )
    case 'dots':
      return (
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={{
                top: `${20 + (i % 3) * 30}%`,
                left: `${15 + Math.floor(i / 3) * 25}%`,
              }}
            />
          ))}
        </div>
      )
    case 'lines':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 20}
              x2="100"
              y2={10 + i * 20}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      )
    default:
      return null
  }
}
