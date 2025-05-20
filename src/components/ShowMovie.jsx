import React from "react";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/apiClient";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RenderGenres from "./renderGenres";

function ShowMovie() {
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

  // const renderGenres = (genreIds) => {
  //   const displayedGenres = genreIds.length > 3 ? genreIds.slice(2) : genreIds;

  //   return displayedGenres.map((id) => {
  //     const genre = genresList.find((g) => g.id === id);
  //     return (
  //       <div
  //         key={id}
  //         className={`text-sm bg-sixth text-fifth font-medium ${
  //           genreIds.length > 3 ? "px-2 py-1" : "px-5 py-6"
  //         } rounded-full`}
  //       >
  //         {genre?.name}
  //       </div>
  //     );
  //   });
  // };

  return (
    <div className="flex flex-col px-20 w-full">
      <div className="grid grid-cols-5 gap-10 py-10">
        {movies.map((item) => (
          <div key={item.id} className="mb-2 mx-auto">
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
      <div className="flex flex-row justify-center items-center gap-5">
        <Button
          variant="primary"
          className="text-[28px] p-2 size-[54px] flex justify-center items-center"
        >
          1
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] flex justify-center items-center size-[54px]"
        >
          2
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] text-center size-[54px] flex justify-center items-center"
        >
          3
        </Button>
        <Button
          variant="secondary"
          className="text-[28px] size-[54px] flex justify-center items-center"
        >
          4
        </Button>
        <Button
          variant="primary"
          className="text-[28px] size-[54px] flex justify-center items-center"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default ShowMovie;
