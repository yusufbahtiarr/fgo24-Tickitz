import React from "react";

function BenefitCard({ icon, text }) {
  return (
    <>
      <div className="flex flex-col bg-third h-full flex-1 rounded-2xl p-4 gap-2 text-left justify-between">
        <div className="bg-primary/80 h-[50px] w-[50px] text-3xl rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="font-semibold text-[28px] grow">{text}</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sint
          animi dolores quaerat
        </div>
      </div>
    </>
  );
}

export default BenefitCard;
