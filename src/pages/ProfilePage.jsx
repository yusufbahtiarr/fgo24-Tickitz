import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoStarFill } from "react-icons/go";

function ProfilePage() {
  return (
    <div>
      <Navbar2 />
      <div className="mt-22 h-full w-full bg-gray1 p-18">
        <div className="p-10 flex flex-row gap-8">
          <div className="w-[30%] h-200 rounded-4xl bg-white flex flex-col">
            <div className="flex-1 flex flex-col p-10 gap-4 justify-between items-center">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-light text-gray-700">INFO</span>
                <button>
                  <HiDotsHorizontal className="size-8 text-primary" />
                </button>
              </div>
              <div className="flex justify-center items-center mb-6">
                <img
                  src="./src/assets/images/profile.png"
                  alt="profile"
                  className="size-[136px] object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-secondary text-[20px] ffont-semibold">
                  Jonas El Rodriguez
                </span>
              </div>
              <div>
                <span>Moviegoers</span>
              </div>
            </div>
            <hr className="border-2 border-gray-200" />
            <div className="flex-1 flex flex-col p-10 gap-6">
              <div>
                <span className="font-semibold">Loyalty Points</span>
              </div>
              <div className="bg-primary rounded-3xl h-44 flex flex-col text-white p-8 justify-between items-start overflow-hidden relative">
                <div>
                  <span className="text-[18px] font-bold">Moviegoers</span>
                </div>
                <div className="flex flex-row items-end gap-2 relative overflow-hidden">
                  <span className="text-[24px] font-semibold leading-7">
                    320
                  </span>
                  <span className="text-[12px]">points</span>
                </div>
                <div className="absolute -top-14 -right-7 size-35 rounded-full bg-white opacity-40"></div>
                <div className="absolute -top-4 -right-14 size-35 rounded-full bg-white opacity-40"></div>
                <div className="absolute top-0 right-0 rotate-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-20 h-20"
                    viewBox="0 0 24 24"
                    fill="url(#starGradient)"
                  >
                    <defs>
                      <linearGradient
                        id="starGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="100%" stop-color="#facc15" />
                      </linearGradient>
                    </defs>
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center w-full">
                <div className="w-full text-center">
                  <span>180 points become a master</span>
                </div>
                <div className="w-full bg-gray2 rounded-full h-5">
                  <div className="w-[50%] bg-primary rounded-full h-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] h-300 rounded-4xl bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
