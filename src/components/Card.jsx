import React from "react";
import Badge from "./Badge";

function Card() {
  return (
    <>
      <div className="flex flex-col gap-2 relative items-center w-[266px]">
        <img
          src="/src/assets/images/movies.png"
          className="h-[400px] w-[266px] rounded-2xl object-cover"
          alt="movies"
        />
        <div>
          <span className="font-medium absolute top-0 left-0 bg-third text-primary py-[8px] px-[12px] rounded-br-2xl">
            Rekomendasi
          </span>
        </div>
        <div className="font-bold text-xl capitalize">THUNDERBOLTS*</div>
        <div className="flex flex-row gap-2">
          <Badge variant="primary">Action</Badge>
          <Badge variant="primary">Adventure</Badge>
        </div>
      </div>
    </>
  );
}

export default Card;
