import React from "react";
import Button from "./Button";

function Subscribe() {
  return (
    <div className="w-full p-20">
      <div className="py-20 px-[244px] bg-third rounded-[48px] flex flex-col gap-20 m-auto">
        <div className="w-full">
          <span className="title-section">Subscribe to Our Newsletter</span>
        </div>
        <div className="w-full">
          <form className="w-full gap-6 flex flex-col">
            <div className="flex gap-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name First"
                className="w-full border-1 border-primary py-3 px-5 rounded-full focus:outline-0"
              />
              <input
                type="text"
                name="email"
                placeholder="Your Email First"
                className="w-full border-1 border-black-500 py-3 px-5 rounded-full focus:outline-0"
              />
            </div>
            <div>
              <Button variant="primary" className="w-full">
                subscribe now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
