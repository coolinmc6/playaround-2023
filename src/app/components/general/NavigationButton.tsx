"use client"

import React from 'react';
import { openDialog } from '@/app/store/dialog';
import Button from '@/core/Button';

const NavigationButton = () => {
  const handleNavOpen = () => openDialog('navigation-dialog')
  return (
    <>
      <Button variant="primary" onClick={handleNavOpen}>Navigation</Button>
    </>
  )
}

export default NavigationButton;
