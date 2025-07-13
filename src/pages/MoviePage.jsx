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
import Subscribe from "../components/Subscribe";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, ScrollRestoration } from "react-router-dom";
import RenderGenres from "../components/RenderGenres";
import http from "../utils/axios";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const currentSearch = searchParams.get("search") || "";
  const currentGenreName = searchParams.get("genre") || "";
  const currentSort = searchParams.get("sort") || "popular";
  const currentPageFromUrl = Number(searchParams.get("page")) || 1;

  // eslint-disable-next-line no-unused-vars
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [sortOption, setSortOption] = useState("popular");

  useEffect(() => {
    const genreId =
      genres.find((g) => g.genre_name === currentGenreName)?.id || null;
    setSelectedGenreId(genreId);
    setSortOption(currentSort);
    setCurrentPage(currentPageFromUrl);
  }, [currentGenreName, currentSort, currentPageFromUrl, genres]);

  const fetchDataAll = useCallback(async () => {
    try {
      const movieRes = await http().get("/movies", {
        params: {
          search: currentSearch,
          genre: currentGenreName,
          sort: currentSort,
          page: currentPageFromUrl,
        },
      });
      const genreRes = await http().get("/movies/genres");

      if (genres.length === 0 && genreRes.data.results) {
        setGenres(genreRes.data.results);
      }

      setMovies(movieRes.data.results || []);
      setTotalPages(movieRes.data.page_info.total_pages || 1);
      setCurrentPage(movieRes.data.page_info.current_page || 1);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
      setMovies([]);
      setTotalPages(1);
    }
  }, [
    currentSearch,
    currentGenreName,
    currentSort,
    currentPageFromUrl,
    genres.length,
  ]);

  useEffect(() => {
    fetchDataAll();
  }, [fetchDataAll]);

  useEffect(() => {
    const fetchGenresOnce = async () => {
      try {
        const genreRes = await http().get("/movies/genres");
        setGenres((prevGenres) => {
          if (
            prevGenres.length === 0 ||
            JSON.stringify(prevGenres) !== JSON.stringify(genreRes.data.results)
          ) {
            return genreRes.data.results || [];
          }
          return prevGenres;
        });
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenresOnce();
  }, []);

  const handleSearchSubmit = useCallback(
    (searchTerm) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (searchTerm) {
            newParams.set("search", searchTerm);
          } else {
            newParams.delete("search");
          }
          newParams.set("page", "1");
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleGenreChange = useCallback(
    (genreId, genreName) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (genreId) {
            newParams.set("genre", genreName);
          } else {
            newParams.delete("genre");
          }
          newParams.set("page", "1");
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleSortChange = useCallback(
    (newSortOption) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("sort", newSortOption);
          newParams.set("page", "1");
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("page", String(newPage));
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <ScrollRestoration />
      <main className="flex flex-col mt-20 sm:mt-25 items-center text-center">
        <div className="w-full">
          <div className="p-6 sm:py-10 sm:px-20">
            <div className="flex flex-row items-end justify-start text-left bg-[url(../src/assets/images/heading.png)] h-[404px] p-10 rounded-[48px] bg-no-repeat bg-cover bg-center relative">
              <div className="absolute top-0 left-0 bottom-0 w-full h-full bg-[linear-gradient(180deg,rgba(15,16,13,0)_0%,rgba(15,16,13,0.8)_65.1%)] z-10 rounded-[48px]"></div>
              <div className="flex flex-col z-10 gap-4">
                <div className="flex justify-center sm:justify-start">
                  <Badge
                    variant="secondary"
                    className="font-black h-[54px] sm:w-[350px] flex items-center justify-center px-6 text-[16px] sm:text-[20px]"
                  >
                    LIST MOVIE OF THE WEEK
                  </Badge>
                </div>

                <div className="flex flex-col text-center sm:text-left gap-4 ">
                  <div>
                    <span className="text-3xl sm:text-[36px] text-white font-normal">
                      Experience the Magic of Cinema:{" "}
                    </span>
                    <br className="block sm:hidden" />
                    <span className="text-3xl sm:text-[36px] font-black text-primary">
                      Book Your Tickets Today
                    </span>
                  </div>
                  <div>
                    <span className="text-third">
                      Sign up and get the ticket with a lot of discount
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col absolute bottom-10 right-10 gap-4 z-99 text-amber-50">
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
        <FilterCinemas
          genres={genres}
          setSelectedGenre={handleGenreChange}
          sortOption={sortOption}
          setSortOption={handleSortChange}
          onSearchSubmit={handleSearchSubmit}
        />

        <ShowMovie
          movies={movies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          navigate={navigate}
        />

        <Subscribe />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

function ShowMovie({
  movies,
  currentPage,
  totalPages,
  onPageChange,
  navigate,
}) {
  return (
    <div className="flex flex-col p-6 sm:px-20 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 sm:gap-10 sm:py-10 mb-4 sm:mb-0">
        {movies.length > 0 ? (
          movies.map((item) => (
            <div key={`list-movie-${item.id}`} className="mb-2 mx-auto">
              <div className="relative sm:w-70 w-fit mb-4 mx-auto">
                {item.rating > 7 && (
                  <div className="absolute text-primary bg-fourth text-sm sm:text-[16px] font-semibold sm:font-bold px-2 py-1 rounded-br-lg ">
                    Recommended
                  </div>
                )}
                <img
                  onClick={() => navigate(`/buy-ticket/${item.id}`)}
                  className="rounded-xl object-cover w-full cursor-pointer"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_url}`}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <div className="flex flex-row itens-center  justify-center gap-2 mt-2">
                <RenderGenres genres={item.genre} limit={2} />
              </div>
            </div>
          ))
        ) : (
          <span className="col-span-full h-100 text-3xl font-medium">
            No movies found.
          </span>
        )}
      </div>
      {movies.length > 0 && (
        <div className="flex flex-row justify-center items-center gap-5">
          <Button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            variant="primary"
            className="text-[28px] p-2 size-[54px] flex justify-center items-center"
            children={<FaArrowLeft />}
          ></Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              onClick={() => onPageChange(index + 1)}
              key={`list-button-${index}`}
              variant={currentPage === index + 1 ? "primary" : "secondary"}
              disabled={currentPage === index + 1}
              className="text-2xl"
            >
              {index + 1}
            </Button>
          ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            variant="primary"
            className="text-[28px] size-[54px] flex justify-center items-center"
            children={<FaArrowRight />}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default MoviePage;
