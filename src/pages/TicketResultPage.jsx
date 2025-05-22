import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Button from "../components/Button";

function TicketResultPage() {
  return (
    <div>
      <Navbar />
      <div className="h-[92vh] box-border max-w-[100%] mt-[86px] flex flex-row">
        <div className="w-[60%] h-[100] bg-amber-200 flex justify-center items-center relative">
          <div className="h-[100%]">
            <img
              src="./src/assets/images/background.png"
              alt="movie"
              className="h-full absolute top-0 left-0 object-cover"
            />
            <div className="absolute top-0 left-0 right-0 h-full w-full bg-black opacity-60"></div>
          </div>
          <div className="mx-auto text-white z-1 mb-10 flex flex-col gap-3">
            <div>
              <img
                src="./src/assets/images/tickitz2.png"
                alt="logo"
                className="w-64"
              />
            </div>
            <div>
              <span className="text-[48px] font-bold">
                Thankyou For Purchasing
              </span>
            </div>
            <div>
              <span className="text-2xl font-light">
                Save or print your ticket before going to the cinema. Enjoy your
                movie!
              </span>
            </div>
            <div className="flex flex-row justify-between items-center w-[41%]">
              <span className="text-[18px] font-bold">
                Please Download Your Ticket
              </span>
              <span>
                <HiOutlineArrowNarrowRight className="size-6" />
              </span>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full px-26 py-10 bg-gray2">
          <div className="flex flex-col rounded-xl h-full items-center gap-4">
            <div className="h-[85%] w-full px-6 py-2">
              <div className="bg-white h-full rounded-xl">
                <div className="px-16">
                  <img
                    src="./src/assets/images/qr.png"
                    alt=""
                    className="p-6 pb-0"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="w-6 h-12 bg-gray2 rounded-r-full"></div>
                  <hr className="w-full border-2 border-gray2 border-dashed" />
                  <div className="w-6 h-12 bg-gray2 rounded-l-full"></div>
                </div>
                <div className="flex flex-col px-10 py-4 gap-8">
                  <div className="flex flex-row ">
                    <div className="flex w-[60%] flex-col gap-2">
                      <span className="text-xs text-gray1">Movie</span>
                      <span className="text-sm text-secondary">
                        Spider-Man: ..
                      </span>
                    </div>
                    <div className="flex w-[4 0%] flex-col gap-2">
                      <span className="text-xs text-gray1">Category</span>
                      <span className="text-sm text-secondary">PG-13</span>
                    </div>
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex w-[60%] flex-col gap-2">
                      <span className="text-xs text-gray1">Date</span>
                      <span className="text-sm text-secondary">07 Jul</span>
                    </div>
                    <div className="flex w-[4 0%] flex-col gap-2">
                      <span className="text-xs text-gray1">Time</span>
                      <span className="text-sm text-secondary">2:00pm</span>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex w-[60%] flex-col gap-2">
                      <span className="text-xs text-gray1">Count</span>
                      <span className="text-sm text-secondary">3 pcs</span>
                    </div>
                    <div className="flex w-[4 0%] flex-col gap-2">
                      <span className="text-xs text-gray1">Seats</span>
                      <span className="text-sm text-secondary">C4, C5, C6</span>
                    </div>
                  </div>
                  <div className="flex flex-row border p-4 border-gray1 rounded justify-between items-center">
                    <span className="text-secondary">Total</span>
                    <span className="text-secondary">$30.00</span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="h-[15%] w-full flex flex-col gap-2">
              <Button variant="outline" className="">
                Download
              </Button>
              <Button variant="third" className=" text-white">
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TicketResultPage;
