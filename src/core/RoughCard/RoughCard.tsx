import React from 'react';

type RoughCardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  type?: 'generic';
}

const RoughCard = ({ title, children, className, type }: RoughCardProps) => {
  const typeClass = type === 'generic' ? 'w-96' : '';
  return (
    <div className={`bg-white shadow-md rounded-md p-4 max-w-lg m-4 inline-block rough-card ${className} ${typeClass}`}>
      {title ? <h2 className="text-xl font-bold mb-3">{title}</h2> : null}
      {children}
    </div>
  )
}


export default RoughCard;
