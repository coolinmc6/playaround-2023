import React from 'react';
import './snackbar.css';
import { type Toast } from '@store/toast';
import { removeToast } from '@store/toast';

const Snackbar = ({ message, id, severity }: Toast) => {
  setTimeout(() => {
    removeToast(id)
  }, 5000)
  return (
    <div className={`snackbar snackbar--${severity}`}>{message}</div>
  );
}

export default Snackbar;