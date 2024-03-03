import React from 'react';

type ChipProps = {
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
};

const Chip = ({ variant = 'primary', children }: ChipProps) => {
  const baseClasses = 'text-sm px-4 py-1 rounded-full font-semibold inline';
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-500 text-white',
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  return <div className={classes}>{children}</div>;
};

export default Chip;
