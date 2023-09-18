import React from 'react'

type CodeDescriptionProps = {
  children: React.ReactNode[];
}

const CodeDescription = ({ children }: CodeDescriptionProps) => {
  const [left, right] = children;
  const baseClasses = 'bg-gray-50 p-4 rounded-md shadow-md';
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={baseClasses}>{left}</div>  
      <div className={baseClasses}>{right}</div>
    </div>
  )
}

export default CodeDescription;