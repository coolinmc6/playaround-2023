import React, { PropsWithChildren } from 'react';

const BasicLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-4">
      {children}
    </div>
  )
}

export default BasicLayout;
