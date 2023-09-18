"use client"

import React from 'react';
import Snackbar from '@core/ToastList/Snackbar'
import { useToastStore } from '@store/toast';

const ToastList = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          {...toast}
        />
      ))}
    </div>
  )
}

export default ToastList;
