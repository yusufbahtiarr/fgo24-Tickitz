import React from "react";

function HeroSection() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 mb-10">
        <div className=" w-120 text-primary bg-third font-bold text-xl rounded-full px-6 py-3 primary">
          MOVIE TICKET PURCHASES #1 IN INDONESIA
        </div>
        <div className="flex flex-col items-center text-[64px] leading-none">
          <span className="font-normal">Experience the Magic of Cinema:</span>
          <span className="font-satoshi font-medium text-primary">
            Book Your Tickets Today
          </span>
        </div>
        <div>
          <span className="text-fifth">
            Sign up and get the ticket with a lot of discount
          </span>
          <span></span>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
