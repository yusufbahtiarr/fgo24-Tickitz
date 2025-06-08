import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDuration } from "../utils/formatTime";
import { fetchData } from "../utils/apiClient";
import { useSearchParams, useLocation } from "react-router-dom";

function AdminMoviePage() {
  const currentUser = useSelector((state) => state.auths.currentUser);
  const films = useSelector((state) => state.films.data);
  const [genresList, setGenresList] = useState([]);
  const [selected, setSelected] = useState(
    `${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  function SelectMonth() {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const year = new Date().getFullYear();

    return (
      <select
        name="selectMonth"
        className="px-6 py-3 rounded-[12px] bg-gray1"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          console.log(e.target.value);
        }}
      >
        {monthNames.map((month, index) => {
          const monthNumber = (index + 1).toString().padStart(2, "0");
          return (
            <option key={index} value={`${monthNumber}/${year}`}>
              {month} {year}
            </option>
          );
        })}
      </select>
    );
  }

  const fetchDataAll = async () => {
    try {
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

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 5;

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  // Pagination logic
  const totalPages = Math.ceil(films.length / itemsPerPage);
  const currentItems = films.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updatePageParam = (page) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    setSearchParams(params);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      updatePageParam(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      updatePageParam(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="p-6 sm:px-15 sm:py-10 flex flex-col gap-6 sm:gap-10 bg-white rounded-xl">
          <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between">
            <div className="sm:flex-1 flex flex-row justify-between items-center">
              <span className="text-[18px] sm:text-2xl font-bold">
                List Movie
              </span>
              <Button
                variant="third"
                className="text-white rounded-xl px-4 block sm:hidden"
              >
                <Link to="/admin-new-movie">Add Movies</Link>
              </Button>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-end gap-4">
              {/* <CiCalendar /> */}
              <SelectMonth />
              <Button
                variant="third"
                className="text-white rounded-xl px-4 hidden sm:block"
              >
                <Link to="/admin-new-movie">Add Movies</Link>
              </Button>
            </div>
          </div>
          <div className="w-full overflow-auto scroll-smooth">
            <table className="w-[820px] sm:w-full text-center mb-6 sm:mb-0">
              <thead>
                <tr>
                  <th className="text-[12px] font-bold p-4">No</th>
                  <th className="text-[12px] font-bold p-4">Thumbnail</th>
                  <th className="text-[12px] font-bold p-4">Movie Name</th>
                  <th className="text-[12px] font-bold p-4">Category</th>
                  <th className="text-[12px] font-bold p-4">Released Date</th>
                  <th className="text-[12px] font-bold p-4">Duration</th>
                  <th className="text-[12px] font-bold p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  return (
                    <tr
                      key={`list-film-${index}`}
                      className="border-t border-gray1 text-[12px] sm:text[16px]"
                    >
                      <td className="py-4 px-2 sm:p-4">{index + 1}</td>
                      <td className="py-4 px-2 sm:p-4 items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt="images"
                          className="inline-block w-[46px] h-[38px] rounded object-cover"
                        />
                      </td>
                      <td className="py-4 px-2 sm:p-4 text-primary">
                        {item.title}
                      </td>
                      <td className="py-4 px-2 sm:p-4">
                        <GenreDisplay
                          item={item.category}
                          genresList={genresList}
                        />
                      </td>
                      <td className="py-4 px-2 sm:p-4">{item.release_date}</td>
                      <td className="py-4 px-2 sm:p-4">
                        {formatDuration(Number(item.runtime))}
                      </td>
                      <td className="py-4 px-2 sm:p-4 flex flexx-row gap-2 justify-center items-center">
                        <button className="size-[31px] flex justify-center items-center bg-blue rounded">
                          <IoMdEye className="text-white" />
                        </button>
                        <button className="size-[31px] flex justify-center items-center bg-violet-600 rounded">
                          <FaPen className="text-white" />
                        </button>
                        <button className="size-[31px] flex justify-center items-center bg-primary rounded">
                          <FaTrash className="text-white" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                    currentPage === 1
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <Link
                      key={number}
                      to={`?page=${number}`}
                      className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                        currentPage === number
                          ? "bg-primary text-white"
                          : "bg-white border border-gray1 hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </Link>
                  )
                )}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                    currentPage === totalPages
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const GenreDisplay = ({ item, genresList }) => {
  const genreIds = item.split(",").map((item) => item.trim());
  // console.log(item);
  // console.log(genreIds);

  const displayedGenres = genreIds.slice(0, 2);

  return (
    <>
      {displayedGenres.length ? (
        displayedGenres.map((id, index) => {
          const genre = genresList.find((g) => g.id == id);
          return genre ? (
            <span key={index} className="genre-tag">
              {genre.name}
              {index < displayedGenres.length - 1 && ", "}
            </span>
          ) : null;
        })
      ) : (
        <span className="text-gray-500">Tidak ada genre</span>
      )}
    </>
  );
};

export default AdminMoviePage;
