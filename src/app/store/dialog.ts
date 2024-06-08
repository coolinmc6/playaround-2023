import { create } from 'zustand';

export type DialogState = {
  isOpen: boolean;
}

export type DialogStoreState = {
  'navigation-dialog': DialogState;
}

export type DialogActions = {
  openDialog: (dialog: string) => void;
  closeDialog: (dialog: string) => void;
}

export const initialState: DialogStoreState = {
  'navigation-dialog': { isOpen: false },
}

export const useDialogStore = create<DialogStoreState & DialogActions>((set, get) => ({
  ...initialState,

  openDialog: (dialog: string) => {
    set((state: any) => ({
      [dialog]: {
        ...state[dialog],
        isOpen: true,
      },
    }))
  },
  closeDialog: (dialog: string) => {
    set((state: any) => ({
      [dialog]: {
        ...state[dialog],
        isOpen: false,
      },
    }))
  },
}))

export const openDialog = (dialog: string) => {
  useDialogStore.getState().openDialog(dialog)
}

export const closeDialog = (dialog: string) => {
  useDialogStore.getState().closeDialog(dialog)
}
