import React from "react";
import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "./../components/Badge";
import Button from "./../components/Button";
import { useNavigate } from "react-router-dom";

function ChairSelector() {
  const chairElements = Array.from({ length: 49 }, (_, i) => (
    <label key={i} htmlFor={`chair${i}`} className="p-2 size-[36px] ">
      <input
        type="checkbox"
        name="chair"
        id={`chair${i}`}
        className="size-[36px] p-2 mt-2"
      />
    </label>
  ));

  return <div>{chairElements}</div>;
}

function OrderPage() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-gray2 *:box-border *:*:box-border overflow-x-hidden">
      <Navbar />
      <div className="h-fit w-full mt-21 px-43">
        <Stepper step2="bg-primary" step3="bg-violet" />
        <section className="w-full h-full flex flex-row gap-8 mb-20">
          <div className="w-300 py-10 px-6 flex flex-col gap-10  bg-white">
            <div className="border flex flex-row border-gray1 gap-4 py-4 px-6 w-full">
              <div class="h-[117px] w-[184px] overflow-y-hidden shrink-0">
                <img src="../src/assets/images/order.png" alt="film" />
              </div>
              <div className=" flex gap-2 flex-col justify-between w-full">
                <span className="text-2xl font-semibold">
                  Spider-Man: Homecoming
                </span>
                <div className="flex flex-row gap-3">
                  <Badge variant="primary">Action</Badge>
                  <Badge variant="primary">Adventure</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Regular - 13:00 PM</span>
                  <Button
                    variant="third"
                    className="rounded py-2 px-5 h-fit text-white font-medium"
                  >
                    Change
                  </Button>
                </div>
              </div>
            </div>
            <div className="font-bold text-2xl mb-10">Choose Your Seat</div>
            <div className="font-light text-[14px] mx-auto mb-6">Screen</div>
            <div className="flex flex-row gap-6 justify-center">
              <div className="flex flex-col justify-start py-[12px] items-center w-10 gap-7 shrink-0 ">
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
                <span>E</span>
                <span>F</span>
                <span>G</span>
              </div>
              <div className="grid grid-col-7 gap-4 w-100">
                {ChairSelector()}
                <div className="pl-4 pr-13 flex flex-row items-center justify-between w-full">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                </div>
              </div>
              <div className="grid grid-col-7 gap-4 w-100">
                {ChairSelector()}
                <div className="pl-4 pr-14 flex flex-row items-center justify-between w-full">
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>
                  <span>14</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-xl font-semibold">Seating Key</span>
            </div>
            <div className="flex flex-row gap-4 items-center justify-between px-6 pr-24">
              <div className="size-[36px] rounded bg-gray1 shadow"></div>
              <span className="text-xl font-semibold">Available</span>
              <div className="size-[36px] rounded bg-blue shadow"></div>
              <span className="text-xl font-semibold">Love Nest</span>
              <div className="size-[36px] rounded bg-pink shadow"></div>
              <span className="text-xl font-semibold">Sold</span>
              <div className="size-[36px] rounded bg-violet shadow"></div>
            </div>
          </div>
          <div className="w-[35%] flex flex-col">
            <div className="p-6 flex flex-col justify-center items-center  bg-white h-fit rounded">
              <div className="p-2">
                <img
                  src="/src/assets/images/CineOne21 3.png"
                  alt="bioskop"
                  className="p-6"
                />
              </div>
              <div className="mx-auto text-2xl font-semibold mb-10">
                CineOne21 Cinema
              </div>
              <div className="flex flex-col w-full gap-4 mb-8">
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">Movie selected</span>
                  <span className="font-semibold text-sm">
                    Spider-Man: Homecoming
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">
                    Tuesday, 07 July 2020
                  </span>
                  <span className="font-semibold text-sm">13:00pm</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">One ticket price</span>
                  <span className="font-semibold text-sm">$10</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">Seat choosed</span>
                  <span className="font-semibold text-sm">C4, C5, C6</span>
                </div>
              </div>
              <hr className="border border-gray1 w-full mb-6" />
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[18px] font-semibold">Total Payment</span>
                <span className="text-blue text-2xl font-bold">$30</span>
              </div>
            </div>
            <Button
              variant="third"
              className="text-white mt-10"
              onClick={() => navigate("/payment")}
            >
              Checkout now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
