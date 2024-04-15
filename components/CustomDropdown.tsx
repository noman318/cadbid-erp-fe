import { FaRegFileLines } from "react-icons/fa6";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiCaretUpDownThin, PiSquaresFourLight } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import { TfiReload } from "react-icons/tfi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
const CustomDropdown = () => {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" mr-2 p-2">
            <IoListOutline className="mr-1" /> List View
            <PiCaretUpDownThin className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <FaRegFileLines className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MdOutlineSpaceDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <VscGraph className="mr-2 h-4 w-4" />
              <span>Kanban</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiSquaresFourLight className="mr-2 h-4 w-4" />
              <span>Image</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant={"outline"} className="mr-2">
        <TfiReload />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className=" mr-2 p-2">
            <PiDotsThreeOutlineFill className="mr-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Import</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>User Permission</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Role Permission Manager</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomDropdown;
