"use client"

import React from 'react';
import { openDialog } from '@/app/store/dialog';
import { GiHamburgerMenu } from "react-icons/gi";

const NavigationButton = () => {
  const handleNavOpen = () => openDialog('navigation-dialog')
  return (
    <>
      <GiHamburgerMenu onClick={() => handleNavOpen()} className="cursor-pointer" />
    </>
  )
}

export default NavigationButton;
