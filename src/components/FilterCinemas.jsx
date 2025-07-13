import { FaAngleDown } from "react-icons/fa6";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import SortDropdown from "./SortOptions";

function FilterCinemas({
  genres,
  setSelectedGenre,
  sortOption,
  setSortOption,
  onSearchSubmit,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const [searchParams] = useSearchParams();
  const genreNameFromUrl = searchParams.get("genre");
  const currentSelectedGenreId =
    genres.find((g) => g.genre_name === genreNameFromUrl)?.id || null;

  const handleGenreClick = (genreId, genreName) => {
    setSelectedGenre(
      genreId === currentSelectedGenreId ? null : genreId,
      genreName
    );
  };
  const displayGenres = genres.slice(0, 5);

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setValue("search", searchQuery);
  }, [searchQuery, setValue]);

  const onSubmit = (data) => {
    onSearchSubmit(data.search);
  };

  return (
    <div className="p-6 sm:px-20 flex flex-col w-full gap-10">
      <div className="flex flex-row w-full justify-between items-center gap-10">
        <div className="text-xl sm:text-3xl text-left sm:title-section">
          Now Showing in Cinemas
        </div>
        <div className="relative inline-block text-left">
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-xl sm:text-[28px] text-left font-semibold w-95">
            Find movie
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Input
                {...register("search")}
                type="text"
                name="search"
                id="search"
                placeholder="Search your movie.."
                defaultValue={searchQuery}
              />
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl sm:text-[28px] font-semibold text-left">
            Filters
          </div>
          <div className="flex space-x-2 flex-wrap gap-2">
            {displayGenres.slice(0, 4).map((genre) => (
              <button
                key={genre.id}
                className={`px-5 py-2 sm:py-3 rounded-full border ${
                  currentSelectedGenreId === genre.id
                    ? "bg-primary text-white"
                    : "bg-eighth text-gray-600 border-gray-300"
                } hover:bg-primary/90 hover:text-white transition-colors`}
                onClick={() => handleGenreClick(genre.id, genre.genre_name)}
              >
                {genre.genre_name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCinemas;
