import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large'; 
  block?: boolean;
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ 
  block,
  children,
  loading,
  onClick,
  size = 'medium',
  variant = 'primary',
}: ButtonProps) => {

  const baseStyle = 'flex items-center justify-center rounded font-medium';

  const variantStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-300 text-gray-900',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-4 py-2', 
    large: 'px-8 py-3 text-xl',
  };
  
  return (
    <button 
    className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${
      block ? 'w-full' : ''
    }`}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;