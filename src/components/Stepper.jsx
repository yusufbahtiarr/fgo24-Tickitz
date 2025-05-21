import React from "react";

function Stepper() {
  return (
    <div className="w-full h-fit flex justify center">
      <div class="flex mx-auto w-[50%] h-fit items-center justify-center py-10 gap-10">
        <div class="flex items-center justify-center flex-col gap-4">
          <div class="w-12 h-12 bg-green text-white rounded-full flex items-center justify-center">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <span class="text-sm">Dates and Time</span>
        </div>
        <div class="flex-1 border-t-3 border-dashed border-violet"></div>

        <div class="flex items-center justify-center flex-col gap-4">
          <div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
            2
          </div>
          <span class="text-sm">Seat</span>
        </div>

        <div class="flex-1 border-t-3 border-dashed border-violet"></div>

        <div class="flex items-center justify-center flex-col gap-4">
          <div class="w-12 h-12 bg-violet text-white rounded-full flex items-center justify-center">
            3
          </div>
          <span class="text-sm">Payment</span>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
