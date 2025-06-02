import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Button from "../components/Button";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { id as localeID } from "date-fns/locale";
import { format } from "date-fns";
import tickitz from "../../src/assets/images/tickitz2.png";
import qr from "../../src/assets/images/qr.png";

function TicketResultPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dataTicket = useSelector((state) => state.tickets.data).find(
    (item) => item.idTicket === id
  );
  console.log(dataTicket);

  return (
    <div>
      <Navbar />
      <div className="h-[92vh] box-border max-w-[100%] mt-[86px] flex flex-row">
        <div className="w-[60%] h-[100] bg-amber-200 flex justify-center items-center relative">
          <div className="h-[100%]">
            <img
              src="../src/assets/images/background.png"
              alt="movie"
              className="h-full absolute top-0 left-0 object-cover"
            />
            <div className="absolute top-0 left-0 right-0 h-full w-full bg-black opacity-60"></div>
          </div>
          <div className="mx-auto text-white z-1 mb-10 flex flex-col gap-3">
            <div>
              <img src={tickitz} alt="logo" className="w-64" />
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
                <div className="px-16 mx-auto w-full flex justify-center items-center">
                  <img src={qr} alt="image" className="p-6 w-80 h-80" />
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
                        {dataTicket.titleMovie}
                      </span>
                    </div>
                    <div className="flex w-[40%] flex-col gap-2">
                      <span className="text-xs text-gray1">Category</span>
                      <span className="text-sm text-secondary">PG-13</span>
                    </div>
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex w-[60%] flex-col gap-2">
                      <span className="text-xs text-gray1">Date</span>
                      <span className="text-sm text-secondary">
                        {format(
                          new Date(dataTicket.date),
                          "EEEE, dd MMMM yyyy",
                          {
                            locale: localeID,
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex w-[40%] flex-col gap-2">
                      <span className="text-xs text-gray1">Time</span>
                      <span className="text-sm text-secondary">
                        {dataTicket.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex w-[60%] flex-col gap-2">
                      <span className="text-xs text-gray1">Count</span>
                      <span className="text-sm text-secondary">
                        {dataTicket.seats.length} pcs
                      </span>
                    </div>
                    <div className="flex w-[40%] flex-col gap-2">
                      <span className="text-xs text-gray1">Seats</span>
                      <span className="text-sm text-secondary">
                        {Array.from(dataTicket?.seats).join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row border p-4 border-gray1 rounded justify-between items-center">
                    <span className="text-secondary">Total</span>
                    <span className="text-secondary">
                      Rp. {dataTicket.totalPayment.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="h-[15%] w-full flex flex-col gap-2">
              <Button
                variant="outline"
                className="flex justify-center items-center gap-2"
              >
                <HiOutlineDownload className="size-6" /> Download
              </Button>
              <Button
                variant="third"
                className=" text-white"
                onClick={() => navigate("/order-history")}
              >
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
