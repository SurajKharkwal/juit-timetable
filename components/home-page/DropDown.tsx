import React from "react";
import { FaGithub } from "react-icons/fa";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

const DropDown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent text-3xl">
          <FaGithub />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem href="https://github.com/shorya-1012" as={Link} key="new">
          {"Shorya's"}
        </DropdownItem>
        <DropdownItem
          href="https://github.com/SurajKharkwal"
          as={Link}
          key="copy"
        >
          {"Suraj's"}
        </DropdownItem>
        <DropdownItem
          href="https://github.com/SurajKharkwal/juit-time-table"
          as={Link}
          key="delete"
          className="text-primary"
          color="primary"
        >
          Repository
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
