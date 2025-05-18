import React from "react";
import Card from "./Card";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

function ShowMovie() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-5 gap-10 py-10">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <Button
          variant="primary"
          className="text-[28px] p-2 size-[54px] flex justify-center items-center"
        >
          1
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] flex justify-center items-center size-[54px]"
        >
          2
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] text-center size-[54px] flex justify-center items-center"
        >
          3
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] size-[54px] flex justify-center items-center"
        >
          4
        </Button>
        <Button
          variant="primary"
          className="text-[28px] size-[54px] flex justify-center items-center"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default ShowMovie;
