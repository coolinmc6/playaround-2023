import React from 'react'

type CodeDescriptionProps = {
  children: React.ReactNode[];
}

const CodeDescription = ({ children }: CodeDescriptionProps) => {
  const [left, right] = children;
  const baseClasses = 'bg-gray-50 p-4 rounded-md shadow-md';
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className={`${baseClasses} col-span-1`}>{left}</div>  
      <div className={`${baseClasses} col-span-2`}>{right}</div>
    </div>
  )
}

export default CodeDescription;