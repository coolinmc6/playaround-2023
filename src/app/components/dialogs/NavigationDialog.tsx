import React from 'react';
import { Dialog, DialogPanel } from '@tremor/react'
import { IoMdClose } from "react-icons/io";

import { useDialogStore, type DialogStoreState, closeDialog } from '@/app/store/dialog';
import RoutesList from '@/app/components/general/RoutesList';

const NavigationDialog = () => {
  const dialogs = useDialogStore((state: DialogStoreState) => state);
  const navDialog = dialogs['navigation-dialog'];
  const handleClose = (bool: boolean) => closeDialog('navigation-dialog')
  const isOpen = navDialog.isOpen;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogPanel>
        <div className="flex flex-row-reverse">
          <IoMdClose onClick={() => handleClose(true)} className="cursor-pointer"/>
        </div>
        <h1 className="text-2xl font-bold text-center">Navigation</h1>
        <RoutesList />
      </DialogPanel>
    </Dialog>
  )
}

export default NavigationDialog;
