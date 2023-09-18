import React from 'react';
import NextLink from 'next/link'

type LinkProps = {
  to: string
  children: React.ReactNode
}

const Link = ({ to, children }: LinkProps) => {
  return (
    <NextLink href={to} className="text-blue-500 hover:underline">
      {children}
    </NextLink>
  )
}

export default Link;