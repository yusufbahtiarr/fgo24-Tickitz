import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingTicket from "../components/BookingTicket";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RenderGenres from "../components/RenderGenres";
import { formatDuration } from "../utils/formatTime";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import http from "../utils/axios";

function BuyTicketPage() {
  const { id } = useParams();

  const [movies, setMovies] = useState({});

  const authToken = useSelector((state) => state.auths.token);
  const users =
    authToken && typeof authToken === "string" ? jwtDecode(authToken) : null;

  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const movieRes = await http().get(`/movies/${id}`);
        setMovies(movieRes.data.results || {});
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };

    fetchDataAll();
  }, [id]);

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-24 sm:mt-28 items-center mb-8 sm:mb-0">
        <div className="relative w-full h-fit">
          <div
            className="w-full rounded-[48px] h-[520px] flex flex-row items-end justify-start text-left p-10 bg-no-repeat bg-cover bg-center relative overflow-hidden"
            style={{
              backgroundImage: `url(${movies.backdrop_url})`,
            }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-full h-full bg-[linear-gradient(180deg,rgba(15,16,13,0)_0%,rgba(15,16,13,0.8)_65.1%)] z-10"></div>
            <div></div>
          </div>
          <div className="absolute top-2 sm:top-[280px] sm:left-[80px] flex flex-col-reverse sm:flex-row h-fit bottom-0 z-20 sm:gap-10 gap-2">
            <div className="flex flex-row justify-center sm:justify-start gap-10">
              <div className="flex max-h-[600px] sm:max-h-[444px] sm:w-[320px] w-full p-6 sm:p-0">
                <img
                  src={`${movies.poster_url}`}
                  className="max-h-[600px] sm:max-h-[444px] sm:w-[292px] w-full rounded-2xl"
                  alt="movie"
                />
              </div>
            </div>
            <div className="flex gap-14 flex-col justify-between">
              <div className="p-6 sm:p-0 sm:pr-6 sm:max-w-260 flex flex-col gap-5 justify-start">
                <div className="text-4xl sm:title-section text-white">
                  {movies.title}
                </div>
                <div className="text-white font-light text-[18px] text-justify ">
                  <p>{movies.overview}</p>
                </div>
                <div className="flex flex-row gap-4">
                  <RenderGenres
                    className=" text-white bg-transparent border border-white"
                    genres={movies.genre}
                    limit={4}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row text-left gap-5 sm:gap-10 sm:pr-40 mt-85 sm:mt-0 p-6 sm:pl-110 relative">
            <div className="flex flex-col sm:mt-0 gap-5 ">
              <div className="flex flex-col min-w-[200px]">
                <div className="font-light text-[18px]">Release Date</div>
                <div className="font-semibold text-[20px]">
                  {movies.release_date &&
                    format(new Date(movies.release_date), "d MMMM yyyy", {
                      locale: localeID,
                    })}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-light text-[18px]">Duration</div>
                <div className="font-semibold text-[20px]">
                  {formatDuration(Number(movies.runtime))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <div className="font-light text-[18px]">Directed By</div>
                <div className="font-semibold text-[20px]">
                  {movies.director}
                </div>
              </div>
              <div className="flex flex-col sm:w-120">
                <div className="font-light text-[18px]">Cast</div>
                <div className="flex flex-row font-semibold text-[20px]">
                  {movies.cast?.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookingTicket titleMovie={movies.title} users={users} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default BuyTicketPage;
