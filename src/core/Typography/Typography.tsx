import React from 'react';

type Variant = 'body-1' | 'h1' | 'h2';

interface TypographyProps {
  variant: Variant,
  children: React.ReactNode
  // className?: string
}

const styles: Record<Variant, string> = {
  'body-1': 'text-base font-normal text-gray-700',
  'h1': 'text-4xl font-bold text-gray-900',
  'h2': 'text-3xl font-bold text-gray-900',
}

const Typography = ({ variant, children }: TypographyProps) => {
  return (
    <p className={styles[variant]}>
      {children}
    </p>
  )
}

export default Typography;
