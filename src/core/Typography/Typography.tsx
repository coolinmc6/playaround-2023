import React from 'react';

type Variant = 'body-1'

interface TypographyProps {
  variant: Variant,
  children: React.ReactNode
  // className?: string
}

const styles: Record<Variant, string> = {
  'body-1': 'text-base font-normal text-gray-700'
}

const Typography = ({ variant, children }: TypographyProps) => {
  return (
    <p className={styles[variant]}>
      {children}
    </p>
  )
}

export default Typography;