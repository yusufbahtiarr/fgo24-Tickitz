import React from "react";
import Button from "./Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Badge from "./Badge";
import Card from "./Card";

function UpcomingMovie() {
  return (
    <>
      <section className="w-full">
        <div className="flex flex-row p-20 w-full gap">
          <div className="flex flex-col justify-between w-[73%] gap-10">
            <div className="flex col gap-8">
              <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]]">
                <img
                  src="/src/assets/images/movies.png"
                  className="h-[282px] w-[190px] rounded-2xl object-cover"
                  alt="movies"
                />
                <div className="font-bold uppercase">TOWARD THE LIGHT</div>
                <div className="flex flex-row gap-2">
                  <Badge variant="secondary" className="font-bold capitalize">
                    15 Mei 2025
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]]">
                <img
                  src="/src/assets/images/movies.png"
                  className="h-[282px] w-[190px] rounded-2xl object-cover"
                  alt="movies"
                />
                <div className="font-bold uppercase">TOWARD THE LIGHT</div>
                <div className="flex flex-row gap-2">
                  <Badge variant="secondary" className="font-bold capitalize">
                    15 Mei 2025
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]]">
                <img
                  src="/src/assets/images/movies.png"
                  className="h-[282px] w-[190px] rounded-2xl object-cover"
                  alt="movies"
                />
                <div className="font-bold uppercase">TOWARD THE LIGHT</div>
                <div className="flex flex-row gap-2">
                  <Badge variant="secondary" className="font-bold capitalize">
                    15 Mei 2025
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]]">
                <img
                  src="/src/assets/images/movies.png"
                  className="h-[282px] w-[190px] rounded-2xl object-cover"
                  alt="movies"
                />
                <div className="font-bold uppercase">TOWARD THE LIGHT</div>
                <div className="flex flex-row gap-2">
                  <Badge variant="secondary" className="font-bold capitalize">
                    15 Mei 2025
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]]">
                <img
                  src="/src/assets/images/movies.png"
                  className="h-[282px] w-[190px] rounded-2xl object-cover"
                  alt="movies"
                />
                <div className="font-bold uppercase">TOWARD THE LIGHT</div>
                <div className="flex flex-row gap-2">
                  <Badge variant="secondary" className="font-bold capitalize">
                    15 Mei 2025
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex col gap-3">
              <Button variant="primary">ACTION</Button>
              <Button variant="secondary">ADVENTURE</Button>
              <Button variant="secondary">COMEDY</Button>
              <Button variant="secondary">SCI-FI</Button>
            </div>
          </div>
          <div className="flex flex-col justify-between w-[27%]">
            <div className="flex flex-col items-start gap-6">
              <Badge
                variant="secondary"
                className="font-bold text-xl h-[54px] w-fit flex justify-center items-center"
                children="UPCOMING MOVIES"
              />
              <span className="title-section">Exciting Movie Coming Soon</span>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  className="h-[56px]"
                  children={<FaArrowLeft />}
                />

                <Button
                  variant="primary"
                  className="h-[56px]"
                  children={<FaArrowRight />}
                />
                <Button />
              </div>
              <div>
                <Button
                  variant="primary"
                  className="h-[54px] flex items-center gap-2"
                >
                  VIEW ALL <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpcomingMovie;
