import React from "react";
import Button from "./Button";

function ModulPayment() {
  return (
    <div className="h-[520px] w-[600px] rounded-xl shadow border-e-amber-5  mx-auto">
      <div className="flex flex-col w-full p-10 gap-8">
        <div className="flex justify-center items-center w-full">
          <span className="text-2xl font-bold">Payment Info</span>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-1 flex flx-row justify-between items-center">
            <div className="w-[70%] flex justify-between items-center text-gray3">
              <div>No. Rekening Virtual</div>
              <div>:</div>
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-between items-center">
            <div>
              <span className="text-[18px] font-bold">12321328913829724</span>
            </div>
            <div>
              <Button variant="outline" className="font-normal text-sm">
                Copy
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-1 flex flx-row justify-between items-center">
            <div className="w-[70%] flex justify-between items-center  text-gray3">
              <div>Total Payment</div>
              <div>:</div>
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-end items-center">
            <div>
              <span className="text-[18px] font-bold text-blue">$30</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <span className=" text-gray3">
            Pay this payment bill before it is due,
            <span className="text-red">on June 23, 2023</span>. If the bill has
            not been paid by the specified time, it will be forfeited
          </span>
        </div>

        <div className="w-full flex gap-4 flex-col">
          <Button variant="third" className="font-bold text-white w-full">
            Check Payment
          </Button>
          <Button
            variant="third"
            className=" bg-white font-bold text-primary w-full shadow"
          >
            Pay Later
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModulPayment;
