import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Badge from "./Badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import http from "../utils/axios";

function UpcomingMovie() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const upcomingRes = await http().get("movies/upcoming");
        setUpcomingMovies(upcomingRes.data.results || []);
        console.log(upcomingRes.data.results);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };

    fetchDataAll();
  }, []);

  const sliderRef = useRef(null);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <section className="w-full">
        <div className="flex flex-col-reverse p-6 sm:flex-row sm:p-20 w-full gap-8">
          <div
            ref={sliderRef}
            className="flex flex-row justify-start sm:w-[73%] scroll-x overflow-hidden gap-10 justify-items-center scrollbar-hide"
          >
            {upcomingMovies.map((item) => (
              <div key={item.id} className="">
                <div className="flex col gap-8">
                  <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_url}`}
                      className="h-[282px] w-[190px] rounded-2xl object-cover"
                      alt="movies"
                    />
                    <div className="font-bold uppercase">{item.title}</div>
                    <div className="flex flex-row gap-2">
                      <Badge
                        variant="secondary"
                        className="font-bold capitalize"
                      >
                        {format(new Date(item.release_date), "d MMMM yyyy", {
                          locale: id,
                        })}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6 justify-between sm:w-[27%]">
            <div className="flex flex-col items-start gap-6">
              <Badge
                variant="secondary"
                className="font-bold text-xl h-[54px] w-full sm:w-fit flex justify-center items-center"
                children="UPCOMING MOVIES"
              />
              <span className="text-4xl sm:title-section">
                Exciting Movie Coming Soon
              </span>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex gap-4">
                <Button
                  onClick={scrollLeft}
                  variant="secondary"
                  className="h-[56px]"
                  children={<FaArrowLeft />}
                />

                <Button
                  onClick={scrollRight}
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
