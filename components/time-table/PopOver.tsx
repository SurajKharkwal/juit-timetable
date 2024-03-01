import React, { useState } from "react";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { GoPlusCircle } from "react-icons/go";
import { LuMinusCircle } from "react-icons/lu";
export default function PopOver() {
  const [zoomVal, setZoomVal] = useState(1);
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button className=" p-2 bg-neutral-800  w-full h-full" isIconOnly><AiOutlineMenuUnfold className="text-4xl" /></Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 flex flex-col gap-2 py-2">
          <Button className="" onClick={()=> setZoomVal(zoomVal+0.1)} endContent={<GoPlusCircle />}>Zoom-in</Button>
          <Button className="" onClick={ () =>setZoomVal((zoomVal-0.1))} endContent={<LuMinusCircle />}>Zoom-out</Button>
          <Button onClick={() => setZoomVal(1)} className="text-xl font-light" endContent={< IoArrowUndoCircleSharp />}>Revert</Button>
          <style jsx global>{
            `#Zoom-Content {
              zoom : ${zoomVal}
            }`
          }</style>
        </div>
      </PopoverContent>
    </Popover>
  );
}
