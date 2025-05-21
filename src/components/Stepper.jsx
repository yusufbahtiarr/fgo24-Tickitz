function Stepper({ step2, step3 }) {
  return (
    <div className="w-full h-fit flex justify center">
      <div className="flex mx-auto w-[50%] h-fit items-center justify-center py-10 gap-10">
        <div className="flex items-center justify-center flex-col gap-4">
          <div className="w-12 h-12 bg-green2 text-white rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5"
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
          <span className="text-sm">Dates and Time</span>
        </div>
        <div className="flex-1 border-t-3 border-dashed border-violet"></div>

        <div className="flex items-center justify-center flex-col gap-4">
          <div
            className={`w-12 h-12 ${step2} text-white rounded-full flex items-center justify-center `}
          >
            2
          </div>
          <span className="text-sm">Seat</span>
        </div>

        <div className="flex-1 border-t-3 border-dashed border-violet"></div>

        <div className="flex items-center justify-center flex-col gap-4">
          <div
            className={`w-12 h-12 ${step3}  text-white rounded-full flex items-center justify-center`}
          >
            3
          </div>
          <span className="text-sm">Payment</span>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
