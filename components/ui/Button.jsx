import { cn } from '@/lib/utils'

const Button = ({ children, className, variant = 'primary', ...props }) => {
  return (
    <button
      className={cn(
        'rounded-lg transition-all duration-300 border',
        {
          'px-4 py-2.5 bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium shadow-sm':
            variant === 'primary',
          'p-2 group-hover:scale-105 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200':
            variant === 'edit',
          'p-2 group-hover:scale-105 bg-red-50 text-red-600 hover:bg-red-100 border-red-200':
            variant === 'delete',
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
