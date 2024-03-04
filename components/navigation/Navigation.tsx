"use client";
import React, { useEffect, useState } from "react";
import DropDown from "../home-page/DropDown";
import { useTheme } from "next-themes";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);
  useEffect(()=>{
    setIsDark(theme === "dark" ? true : false);
  } ,[theme])
  return (
    <nav className="w-full fixed top-0 left-0 flex items-center justify-center  h-[10vh]">
      <div className="max-w-[100vw] md:max-w-[90vw] flex items-center justify-end pl-4 pr-4 w-full h-full ">
        <Tooltip content="Change Theme">
          <Button
            className="text-2xl bg-transparent "
            isIconOnly
          >
            {isDark ? (
              <MdOutlineLightMode onClick={() => setTheme("light")} />
            ) : (
              <MdDarkMode onClick={() => setTheme("dark")} />
            )}
          </Button>
        </Tooltip>
        <p className='max-md:hidden text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"'>
          Check out our
        </p>
        <DropDown />
      </div>
    </nav>
  );
};

export default Navigation;
