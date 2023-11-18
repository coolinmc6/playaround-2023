import React from 'react';

export type FontType = 'Dashness' |
  'KGPrimaryDots' |
  'KGPrimaryDotsLined' |
  'KGPrimaryDotsLinedAlt' |
  'KGPrimaryDotsLinedAlt2'

type TracingFontProps = {
  font: FontType;
  children: React.ReactNode;
  fontSize?: string;
}

const TracingFont = ({ font, fontSize = '100px', children }: TracingFontProps) => {
  return (
    <span style={{ fontFamily: font, fontSize, lineHeight: '70px' }}>
      {children}
    </span>
  )
}

export default TracingFont;
