import React, { PropsWithChildren } from 'react';

type PageContentProps = {
  className?: string;
}

const PageContent = ({ children, className }: PropsWithChildren<PageContentProps>) => {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  )
}

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={`text-2xl p-2 ${className}`}>
      {children}
    </div>
  )
}

export default PageContent;

PageContent.Header = Header;
