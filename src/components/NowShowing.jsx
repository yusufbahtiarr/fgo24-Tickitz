import { fetchData } from "../utils/apiClient";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import RenderGenres from "../components/RenderGenres";
import { useNavigate } from "react-router-dom";

function NowShowing() {
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="w-full px-6 sm:px-20 mb-10">
      <div className="flex justify-between items-center overflow-hidden gap-2">
        <button
          onClick={scrollLeft}
          className="order-2 sm:order-1 font-bold button-icon md:text-lg text-sm size-[56px] px-5 py-3 flex justify-center items-center"
        >
          <FaArrowLeft />
        </button>
        <p className="order-1 flex-1 sm:order-2 text-[20px] font-semibold md:text-4xl sm:text-2xl text-left sm:text-center">
          Now Showing in Cinemas
        </p>
        <button
          onClick={scrollRight}
          className="order-3 button-icon font-bold md:text-lg text-sm size-[56px] px-5 py-3 flex justify-center items-center"
        >
          <FaArrowRight />
        </button>
      </div>
      <div
        ref={sliderRef}
        className="scroll-x overflow-x-auto flex gap-5 justify-items-center pt-8 "
      >
        {movies.map((item) => (
          <div key={item.id} className="mb-2">
            <div className="relative lg:w-70 w-50 mb-4">
              {item.vote_average > 7 && (
                <div className="absolute text-primary bg-fourth font-bold px-2 py-1 rounded-br-lg ">
                  Recommended
                </div>
              )}
              <img
                onClick={() => navigate(`/buy-ticket/${item.id}`)}
                className="rounded-xl object-cover cursor-pointer"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt="image-film"
              />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <div className="flex flex-row itens-center  justify-center gap-2 mt-2">
              <RenderGenres genreIds={item.genre_ids} genresList={genresList} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center mt-4">
        <Link
          to="/movies"
          className="flex items-center bg-primary text-white rounded-full px-4 py-2"
        >
          <span>VIEW ALL</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default NowShowing;
