import { useEffect, useState } from "react";
import Button from "./Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Badge from "./Badge";
import { fetchData } from "../utils/apiClient";
import { format } from "date-fns";
import { id } from "date-fns/locale";

function UpcomingMovie() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        // Fetch upcoming movie list
        const upcomingRes = await fetchData.getUpcomingMovies();
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

  return (
    <>
      <section className="w-full">
        <div className="flex flex-row p-20 w-full gap-8">
          <div className="flex flex-row justify-between w-[73%] scroll-x overflow-x-auto gap-8 justify-items-center">
            {upcomingMovies.slice(0, 4).map((item) => (
              <div key={item.id} className="">
                <div className="flex col gap-8">
                  <div className="flex flex-col gap-2 relative items-center h-fit w-[190px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
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
