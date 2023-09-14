import React from 'react';

interface CodeProps {
  children: React.ReactNode
}

const Code = ({ children }: CodeProps) => {
  return (
    <code className="text-sm font-mono bg-gray-100 rounded p-1 text-red-800 mx-1">
      {children}
    </code>
  )
}

export default Code;