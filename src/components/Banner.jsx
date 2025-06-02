import React from "react";
import Badge from "./Badge";
import Card from "./Card";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";

function Banner() {
  return (
    <>
      <div className="w-full">
        <div className="py-10 px-20">
          <div className="flex flex-row items-end justify-start text-left bg-[url(../src/assets/images/heading.png)] h-[404px] p-10 rounded-[48px] bg-no-repeat bg-cover bg-center relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-full h-full bg-[linear-gradient(180deg,rgba(15,16,13,0)_0%,rgba(15,16,13,0.8)_65.1%)] z-10"></div>
            <div className="flex flex-col z-10">
              <div>
                <Badge
                  variant="secondary"
                  className="font-black h-[54px] w-[300px] flex items-center justify-center text-[20px]"
                >
                  LIST MOVIE OF THE WEEK
                </Badge>
              </div>

              <div className="flex flex-col">
                <div>
                  <span className="text-[36px] text-white font-normal">
                    Experience the Magic of Cinema:
                  </span>
                  <span className="text-[36px] font-black text-primary">
                    {" "}
                    Book Your Tickets Today
                  </span>
                </div>
                <div>
                  <span className="text-third">
                    Sign up and get the ticket with a lot of discount
                  </span>
                </div>
              </div>
              <div className="flex flex-col absolute bottom-10 right-10 gap-4 z-99 text-amber-50">
                <div>
                  <FaAngleUp />
                </div>
                <div className="flex flex-col gap-2">
                  <FaRegCircle />
                  <FaCircle className="text-primary" />
                  <FaRegCircle />
                </div>
                <div>
                  <FaAngleDown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
