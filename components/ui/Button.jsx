import { cn } from '@/lib/utils'

const Button = ({ children, className, variant, ...props }) => {
  return (
    <button
      className={cn(
        'p-2 rounded-lg transition-all duration-300 group-hover:scale-105 border',
        {
          'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200': variant === 'edit',
          'bg-red-50 text-red-600 hover:bg-red-100 border-red-200': variant === 'delete',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
