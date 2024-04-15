"use client";
import { ChevronLeft, FileBarChart2, Gavel, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const Menus = [
    { title: "DASHBOARD", src: FileBarChart2, href: "dashboard" },
    { title: "BID", src: Gavel, href: "bid" },
    { title: "SETUP", src: Settings, href: "setup" },
  ];
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // console.log(`effect running`);
      if (window.innerWidth >= 1044) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    // console.log(`effect running`);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log("open", open);

  return (
    <div className="flex fixed bg-white">
      <div
        className={`${
          open ? "w-56" : "w-20"
        } duration-300 h-screen border-r-2 relative`}
      >
        <ChevronLeft
          height={30}
          className={`absolute cursor-pointer top-9 -right-3 w-7 rounded-full bg-gray-200 hover:border-black hover:border duration-100 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link
              key={index}
              href={`/${Menu.href}`}
              className={`flex_center rounded-md p-2 cursor-pointer hover:bg-slate-200 transition-all  text-sm gap-x-4 
               ${index === 0 && "bg-light-white"}`}
            >
              <Menu.src />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 capitalize font-semibold`}
              >
                {Menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
