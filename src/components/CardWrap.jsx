import React from "react";
import { PiStarOfDavidFill } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import BenefitCard from "./BenefitCard";
import Badge from "./Badge";

function CardWrap() {
  return (
    <>
      <div className="bg-black rounded-4xl h-105 w-full flex p-20 gap-8">
        <div className="flex flex-col justify-between w-[32%]">
          <Badge
            variant="secondary"
            className="font-bold text-xl h-[54px] w-fit px-8 flex items-center justify-center"
            children="WHY CHOOSE ME"
          />
          <div className="title-section text-sixth">
            Unleashing the Ultimate Movie Experience
          </div>
        </div>
        <div className="flex flex-row gap-6 w-[68%]">
          <BenefitCard icon={<PiStarOfDavidFill />} text="Guaranted" />
          <BenefitCard icon={<FaMoneyBillWave />} text="Affordable" />
          <BenefitCard
            icon={<RiCustomerService2Fill />}
            text="24/7 Customer Support"
          />
        </div>
      </div>
    </>
  );
}

export default CardWrap;
