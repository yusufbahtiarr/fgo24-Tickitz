import {
  FaAngleDown,
  FaAngleUp,
  FaArrowLeft,
  FaCircle,
  FaRegCircle,
} from "react-icons/fa";
import Badge from "../components/Badge";
import FilterCinemas from "../components/FilterCinemas";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import ShowMovie from "../components/ShowMovie";
import Subscribe from "../components/Subscribe";
import { useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/apiClient";
import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RenderGenres from "../components/renderGenres";

function MoviePage() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-25 items-center text-center">
        <div className="w-full">
          <div className="py-10 px-20 ">
            <div className="flex flex-row items-end justify-start text-left bg-[url(/src/assets/images/heading.png)] h-[404px] p-10 rounded-[48px] bg-no-repeat bg-cover bg-center relative">
              <div className="absolute top-0 left-0 bottom-0 w-full h-full bg-[linear-gradient(180deg,rgba(15,16,13,0)_0%,rgba(15,16,13,0.8)_65.1%)] z-10 rounded-[48px]"></div>
              <div className="flex flex-col z-10">
                <div>
                  <Badge
                    variant="secondary"
                    className="font-black h-[54px] w-[350px] flex items-center justify-center text-[20px]"
                  >
                    LIST MOVIE OF THE WEEK
                  </Badge>
                </div>

                <div className="flex flex-col">
                  <div>
                    <span className="text-[36px] text-white font-normal">
                      Experience the Magic of Cinema:
                    </span>
                    <span className="text-[36px] font-black text-primary">
                      {" "}
                      Book Your Tickets Today
                    </span>
                  </div>
                  <div>
                    <span className="text-third">
                      Sign up and get the ticket with a lot of discount
                    </span>
                  </div>
                </div>
                <div className="flex flex-col absolute bottom-10 right-10 gap-4 z-99 text-amber-50">
                  <div>
                    <FaAngleUp />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FaRegCircle />
                    <FaCircle className="text-primary" />
                    <FaRegCircle />
                  </div>
                  <div>
                    <FaAngleDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilterCinemas />
        {ShowMovie()}
        <Subscribe />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

function ShowMovie() {
  // const users = useSelector((state) => state.users.data);
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search");
  const filteredSearch = movies.filter((item) => {
    return item.title?.toLowerCase().includes(searchQuery?.toLowerCase() || "");
  });
  const PAGE = Number(searchParams.get("page")) || 1;
  const LIMIT = Number(searchParams.get("limit")) || 10;
  const OFFSET = (PAGE - 1) * LIMIT;
  const TOTALPAGE = Math.ceil(filteredSearch.length / LIMIT);

  const fetchDataAll = async () => {
    try {
      // Fetch movie list
      const movieRes = await fetchData.getNowPlaying();
      setMovies(movieRes.data.results || []);

      // Fetch genre list
      const genreRes = await fetchData.getMovieGenres();
      setGenresList(genreRes.data.genres || []);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchDataAll();
  }, []);

  return (
    <div className="flex flex-col px-20 w-full">
      <div className="grid grid-cols-5 gap-10 py-10">
        {filteredSearch.slice(OFFSET, LIMIT * PAGE).map((item) => (
          <div key={`list-movie-${item.id}`} className="mb-2 mx-auto">
            <div className="relative lg:w-70 w-50 mb-4 mx-auto">
              {item.vote_average > 7 && (
                <div className="absolute text-primary bg-third font-bold px-2 py-1 rounded-br-lg ">
                  Recommended
                </div>
              )}
              <img
                onClick={() => navigate(`/buy-ticket/${item.id}`)}
                className="rounded-xl object-cover w-full cursor-pointer"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt=""
              />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <div className="flex flex-row itens-center  justify-center gap-2 mt-2">
              <RenderGenres genreIds={item.genre_ids} genresList={genresList} />
            </div>
          </div>
        ))}
      </div>
      {filteredSearch.length === 0 ? (
        <span className="h-100 text-2xl font-medium">
          Pencarian dengan judul "{searchQuery}" tidak ditemukan
        </span>
      ) : (
        <div className="flex flex-row justify-center items-center gap-5">
          <Button
            FaArrowRight
            disabled={PAGE === 1}
            onClick={() =>
              setSearchParams({ search: searchQuery, page: String(PAGE - 1) })
            }
            variant="primary"
            className="text-[28px] p-2 size-[54px] flex justify-center items-center"
          >
            <FaArrowLeft />
          </Button>
          {Array.from({ length: TOTALPAGE }).map((_, index) => (
            <Button
              onClick={() =>
                setSearchParams({
                  search: searchQuery,
                  page: String(index + 1),
                })
              }
              key={`list-button-${index}`}
              variant={PAGE === index + 1 ? "primary" : "secondary"}
              disabled={PAGE === index + 1}
              className="text-2xl"
            >
              {index + 1}
            </Button>
          ))}
          <Button
            disabled={PAGE === TOTALPAGE}
            onClick={() =>
              setSearchParams({ search: searchQuery, page: String(PAGE + 1) })
            }
            variant="primary"
            className="text-[28px] size-[54px] flex justify-center items-center"
          >
            <FaArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default MoviePage;
