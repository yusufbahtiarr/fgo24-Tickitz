import React from "react";
import Input from "./Input";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

function Choose({ title, placeholder, name }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-semibold text-[28px] px-">{title}</div>
      <div className="flex flex-row justify-between h-[54px] px-3 items-center border-1 border-black rounded-full">
        <IoSearch className="size-[24px]" />
        <input
          className="px-5 py-2 outline-0 w-full"
          name={name}
          placeholder={placeholder}
        ></input>
        <FaAngleDown className="size-[24px]" />
      </div>
    </div>
  );
}

export default Choose;
