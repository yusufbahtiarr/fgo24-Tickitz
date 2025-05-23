import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { HiDotsHorizontal } from "react-icons/hi";
import Button from "./../components/Button";

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
                    className="w-20 h-20"
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
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#facc15" />
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
          <div className="w-[70%] h-300 rounded-4xl flex flex-col gap-14">
            <form className=" flex flex-col gap-12">
              <div className="flex flex-row gap-10 bg-white rounded-3xl px-15 items-center text-[18px]">
                <span className="font-normal border-b-2 border-primary py-6">
                  Account Settings
                </span>
                <span className="text-fourth">Order History</span>
              </div>
              <div className="bg-white rounded-3xl flex flex-col px-8 py-10 gap-4">
                <div>
                  <span className="font-normal">Details Information</span>
                </div>
                <hr className="border-1 border-gray2 mb-4" />
                <div className="flex flex-row gap-9">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="firstname" className="text-fourth">
                      First Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Jonas"
                        className="outline-0 w-[85%]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="lastname" className="text-fourth">
                      Last Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="El Rodriguez"
                        className="outline-0 w-[85%]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-9 mb-4">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="email" className="text-fourth">
                      E-mail
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="jonasrodrigu123@gmail.com"
                        className="outline-0 w-[85%]  "
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="Phone Number" className="text-fourth">
                      Last Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="+6281445687121"
                        className="outline-0 w-[85%]  "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl flex flex-col px-8 py-10 gap-4">
                <div>
                  <span className="font-normal">Account and Privacy</span>
                </div>
                <hr className="border-1 border-gray2 mb-4" />
                <div className="flex flex-row gap-9">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="new-password" className="text-fourth">
                      New Password
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        placeholder="Write your password"
                        className="outline-0 w-[85%] "
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="confirm-password" className="text-fourth">
                      Last Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm your password"
                        className="outline-0 w-[85%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Button
                  variant="third"
                  className="text-white w-[30%] capitalize rounded-2xl"
                >
                  Update changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
