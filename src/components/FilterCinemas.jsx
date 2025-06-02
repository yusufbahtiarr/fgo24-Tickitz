import { FaAngleDown } from "react-icons/fa6";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function FilterCinemas({ genresList, selectedGenre, setSelectedGenre }) {
  const { register, handleSubmit, setValue } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleGenreClick = (genreId, genreName) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);

    // Ambil parameter search jika ada
    const searchQuery = searchParams.get("search");

    if (genreId === selectedGenre) {
      // Jika genre yang sama diklik lagi (toggle off), hapus genre, pertahankan search jika ada
      if (searchQuery) {
        setSearchParams({ search: searchQuery });
      } else {
        setSearchParams({});
      }
    } else {
      // Saat genre baru dipilih, hanya simpan genre (dan search jika ada)
      const newParams = searchQuery
        ? { search: searchQuery, genre: genreName.toLowerCase() }
        : { genre: genreName.toLowerCase() };
      setSearchParams(newParams);
    }
  };
  const displayGenres = genresList.slice(0, 5);

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setValue("search", searchQuery);
  }, [searchQuery, setValue]);

  const onSubmit = (data) => {
    setSearchParams({
      ...(data.search ? { search: data.search } : {}),
      page: 1,
    });
  };

  return (
    <div className="p-6 sm:px-20 flex flex-col w-full gap-10">
      <div className="flex flex-row w-full justify-between items-center gap-10">
        <div className="text-3xl text-left sm:title-section">
          Now Showing in Cinemas
        </div>
        <div>
          <Button
            variant="primary"
            className="flex flex-row items-center h-[54px] font-bold gap-2"
          >
            POPULER <FaAngleDown />
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-[28px] text-left font-semibold w-95">
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
          <div className="text-[28px] font-semibold text-left">Filters</div>
          <div className="flex space-x-2 flex-wrap gap-2">
            {displayGenres.slice(0, 4).map((genre) => (
              <button
                key={genre.id}
                className={`px-4 py-2 rounded-full border ${
                  selectedGenre === genre.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 border-gray-300"
                } hover:bg-primary/90 hover:text-white transition-colors`}
                onClick={() => handleGenreClick(genre.id, genre.name)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCinemas;
