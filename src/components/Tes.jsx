import React from "react";
import { FaCheck } from "react-icons/fa";

function Tes() {
  return (
    <div className="flex gap-4">
      <label className="relative cursor-pointer px-8 py-6 rounded-[20px] min-w-[180px] flex justify-center items-center border border-primary font-semibold text-3xl">
        <input type="radio" name="provider" />
        <span className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white text-primary"></span>
      </label>
    </div>
  );
}

export default Tes;
