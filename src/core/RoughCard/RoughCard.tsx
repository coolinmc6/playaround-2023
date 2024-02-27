import React from 'react';

type RoughCardProps = {
  children: React.ReactNode;
  title?: string;
}

const RoughCard = ({ title, children }: RoughCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-lg m-4 inline-block">
      {title ? <h2 className="text-xl font-bold mb-3">{title}</h2> : null}
      {children}
    </div>
  )
}

export default RoughCard;
