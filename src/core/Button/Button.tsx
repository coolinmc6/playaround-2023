"use client"

import { ReactNode, useEffect, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean;
  children: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  randomColor?: boolean;
  rootClassName?: string;
  size?: 'small' | 'medium' | 'large'; 
  variant?: 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success' | 'outlinePrimary' | 'outlineSecondary' | 'outlineInfo' | 'outlineWarning' | 'outlineDanger' | 'outlineSuccess';
}

function generateRandomHexColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

const Button = ({ 
  block,
  children,
  loading,
  onClick,
  randomColor = false,
  rootClassName = '',
  size = 'medium',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const [randomColorStyle, setRandomColorStyle] = useState({});

  useEffect(() => {
    if (randomColor) {
      setRandomColorStyle({ backgroundColor: generateRandomHexColor() });
    }
  }, [randomColor])

  const baseStyle = 'items-center justify-center rounded font-medium';

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200',
    secondary: 'bg-gray-300 text-gray-900 hover:bg-gray-400 focus:ring-gray-300 focus:ring-offset-gray-200',
    info: 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-100 focus:ring-offset-blue-200',
    warning: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-offset-yellow-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200',
    outlinePrimary: 'text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 focus:ring-offset-blue-200',
    outlineSecondary: 'text-gray-900 border border-gray-300 hover:bg-gray-300 hover:text-gray-900 focus:ring-gray-300 focus:ring-offset-gray-200',
    outlineInfo: 'text-blue-800 border border-blue-100 hover:bg-blue-100 hover:text-blue-800 focus:ring-blue-100 focus:ring-offset-blue-200',
    outlineWarning: 'text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 focus:ring-yellow-400 focus:ring-offset-yellow-200',
    outlineDanger: 'text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500 focus:ring-offset-red-200',
    outlineSuccess: 'text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-green-500 focus:ring-offset-green-200',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-4 py-2', 
    large: 'px-8 py-3 text-xl',
  };
  
  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${rootClassName} ${
        block ? 'w-full' : ''
      }`}
      disabled={loading}
      onClick={onClick}
      style={randomColorStyle}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button;
