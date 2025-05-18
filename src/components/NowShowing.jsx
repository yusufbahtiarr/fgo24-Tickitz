import React from "react";
import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "./Card";

function NowShowing() {
  return (
    <>
      <section className="flex flex-col  w-full gap-5 px-20">
        <div className="flex flex-row items-center justify-between">
          <Button variant="secondary" className="h-[54px]">
            <FaArrowLeft className="h-[24px]" />
          </Button>
          <span className="text-4xl font-medium">Now Showing in Cinemas</span>
          <Button variant="primary" className="h-[54px]">
            <FaArrowRight className="h-[24px]" />
          </Button>
        </div>
        <div className="flex flex-row w-full gap-8 flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="h-2 w-full bg-sixth rounded-full">
          <div className="h-2 w-[40%] bg-primary rounded-full"></div>
        </div>
        <div className="flex items-center justify-center mb-10">
          <Button variant="primary" className="flex items-center gap-2">
            VIEW ALL <FaArrowRight />
          </Button>
        </div>
      </section>
    </>
  );
}

export default NowShowing;
