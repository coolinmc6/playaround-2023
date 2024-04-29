import React, { type ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  type: 'info' | 'success' | 'warning' | 'danger';
}

const Badge = ({ children, type = 'info' }: BadgeProps) => {
  const baseClasses = "px-2 py-1 text-sm font-semibold text-white rounded-full";
  const typeClasses = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500"
  };

  const className = `${baseClasses} ${typeClasses[type] || typeClasses.info}`;

  return (
    <span className={className}>
      {children}
    </span>
  );
};

export default Badge;
