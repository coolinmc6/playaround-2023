import { create } from 'zustand';

export type Severity = 'success' | 'info' | 'warning' | 'error'

export type Toast = {
  id: string;
  open?: boolean;
  severity: Severity;
  message: string;
}

export type ToastState = {
  toasts: Toast[]
}

type ToastActions = {
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
}

const testToast: Toast = {
  id: '1',
  open: true,
  severity: 'success',
  message: 'This is a test toast',
}

export const initialState: ToastState = {
  toasts: [],
}

export const useToastStore = create<ToastState & ToastActions>((set, get) => ({
  ...initialState,

  addToast: (toast: Toast) => {
    const toasts = get().toasts

    set((state) => ({
      toasts: [...toasts, toast]
    }))
  }, 
  removeToast: (id: string) => {
    const toasts = get().toasts

    set((state) => ({
      toasts: toasts.filter((toast) => toast.id !== id),
    }))
  },
}))

export const addToast = (toast: Toast) => {
  useToastStore.getState().addToast(toast)
}

export const removeToast = (id: string) => {
  useToastStore.getState().removeToast(id)
}
