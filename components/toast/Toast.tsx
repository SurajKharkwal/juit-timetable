"use client"
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './styles.css';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ToastComponent = ({open, setOpen}: Props) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <div className=''>
          <Toast.Title className="ToastTitle">
            <h1 className='text-red-700 font-extrabold '>No Data Found</h1>
          </Toast.Title>
          <Toast.Description asChild>
            <p className='text-red-500 font-semibold'>Please Check, Course Name & Batch Name again ...</p>
          </Toast.Description>
        </div>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};


export default ToastComponent;
