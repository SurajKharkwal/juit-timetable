import React from 'react'
import { FaGithub } from "react-icons/fa";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
const DropDown = () => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className='bg-transparent text-5xl'>
                    <FaGithub />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                    <a href="https://github.com/shorya-1012" className='w-full h-full'>
                        Shorya's
                    </a>
                </DropdownItem>
                <DropdownItem key="copy">
                    <a href="https://github.com/SurajKharkwal" className='w-full h-full'>
                        Suraj's
                    </a>
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                    <a className='w-full h-full' href="https://github.com/SurajKharkwal/juit-time-table">
                        Repositry
                    </a>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropDown