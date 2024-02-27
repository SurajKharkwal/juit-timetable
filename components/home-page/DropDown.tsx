import React from 'react'
import { FaGithub } from "react-icons/fa";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
function handleShoryaBtn() {
    window.location.href = 'https://github.com/shorya-1012'
}

function handleSurajBtn() {
    window.location.href = 'https://github.com/SurajKharkwal'
}
function handleRepoBtn() {
    window.location.href = 'https://github.com/SurajKharkwal/juit-time-table'
}
const DropDown = () => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className='bg-transparent text-5xl'>
                    <FaGithub />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem onClick={handleShoryaBtn} key="new">
                    {"Shorya's"}
                </DropdownItem>
                <DropdownItem onClick={handleSurajBtn} key="copy">
                    {"Suraj's"}
                </DropdownItem>
                <DropdownItem key="delete" onClick={handleRepoBtn} className="text-danger" color="danger">
                    Repository
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropDown