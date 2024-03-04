"use client";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { IoCloseCircle } from "react-icons/io5";
import "./styles.css";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ToastComponent = ({ open, setOpen }: Props) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <div className="">
          <h1 className="flex items-center font-semibold text-red-500 justify-start gap-2 ">
            <IoCloseCircle  className="text-2xl text-red-500 "/>
            Operation Falied !
          </h1>
          <p>Please, Check the Bactch or Course Name</p>
        </div>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastComponent;
