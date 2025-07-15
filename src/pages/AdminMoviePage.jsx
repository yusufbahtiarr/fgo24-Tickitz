import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { IoMdEye } from "react-icons/io";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState, useMemo } from "react";
import { formatDuration } from "../utils/formatTime";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";
import { format } from "date-fns";
import { showNotif } from "../utils/notif";

function AdminMoviePage() {
  const authToken = useSelector((state) => state.auths.token);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [item, setItems] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const users = useMemo(() => {
    return authToken && typeof authToken === "string"
      ? jwtDecode(authToken)
      : null;
  }, [authToken]);

  const currentReleaseMonthFromUrl = searchParams.get("release_month") || "";
  const currentPageFromUrl = Number(searchParams.get("page")) || 1;

  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    if (currentReleaseMonthFromUrl) {
      return currentReleaseMonthFromUrl;
    }
    const today = new Date();
    const monthNumber = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${monthNumber}/${year}`;
  });

  function SelectMonth({ selected, setSelected, setSearchParams }) {
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

    const yearsToShow = [year];

    return (
      <select
        name="selectMonth"
        className="px-6 py-3 rounded-[12px] bg-gray1"
        value={selected}
        onChange={(e) => {
          const newValue = e.target.value;
          setSelected(newValue);
          setSearchParams(
            (prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("release_month", newValue);
              newParams.set("page", "1");
              return newParams;
            },
            { replace: true }
          );
        }}
      >
        {yearsToShow.map((y) =>
          monthNames.map((month, index) => {
            const monthNumber = (index + 1).toString().padStart(2, "0");
            const value = `${y}-${monthNumber}`;
            return (
              <option key={`${y}-${monthNumber}`} value={value}>
                {month} {y}
              </option>
            );
          })
        )}
      </select>
    );
  }
  const fetchDataAll = useCallback(async () => {
    try {
      const movieRes = await http(authToken).get("/admin/movies", {
        params: {
          release_month: currentReleaseMonthFromUrl,
          page: currentPageFromUrl,
        },
      });
      setMovies(movieRes.data.results || []);
      setTotalPages(movieRes.data.page_info?.total_pages || 1);
      if (genres.length === 0) {
        const genreRes = await http().get("/movies/genres");
        setGenres(genreRes.data.results || []);
      }
    } catch (error) {
      console.error(
        "Error fetching admin movie data:",
        error.response?.data || error.message
      );
      setMovies([]);
      setTotalPages(1);
    }
  }, [
    authToken,
    currentReleaseMonthFromUrl,
    currentPageFromUrl,
    genres.length,
  ]);

  useEffect(() => {
    fetchDataAll();
  }, [fetchDataAll]);

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

  const goToPrevPage = useCallback(() => {
    if (currentPageFromUrl > 1) {
      handlePageChange(currentPageFromUrl - 1);
    }
  }, [currentPageFromUrl, handlePageChange]);

  const goToNextPage = useCallback(() => {
    if (currentPageFromUrl < totalPages) {
      handlePageChange(currentPageFromUrl + 1);
    }
  }, [currentPageFromUrl, totalPages, handlePageChange]);

  if (!users || users.role !== "admin") {
    console.log("Redirecting: User not logged in or not an Admin.");
    return <Navigate to="/login" replace />;
  }

  const handleDeleteWithAlert = (id, title) => {
    setItems({ id, title });
    setShowAlert(true);
  };

  const confirmDeleteAlert = async () => {
    try {
      await http(authToken).delete(`/admin/movies/${item.id}`);
      showNotif("success", `Data movie ${item.title} berhasil di hapus.`);
      setItems(null);
      setShowAlert(false);
      fetchDataAll();
    } catch (error) {
      showNotif("error", `Data movie ${item.title} gagal di hapus.`);
    }
  };
  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="p-6 sm:px-15 sm:py-10 flex flex-col gap-6 sm:gap-2 bg-white rounded-xl">
          <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between mb-3">
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
              <SelectMonth
                selected={selectedMonthYear}
                setSelected={setSelectedMonthYear}
                setSearchParams={setSearchParams}
              />
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
                {movies.map((item, index) => {
                  return (
                    <tr
                      key={`list-film-${item.id || index}`}
                      className="border-t border-gray1 text-[12px] sm:text[16px]"
                    >
                      <td className="py-4 px-2 sm:p-3">
                        {index + 1 + (currentPageFromUrl - 1) * 10}
                      </td>
                      <td className="py-4 px-2 sm:p-3 items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_url}`}
                          alt={item.title}
                          className="inline-block w-[46px] h-[38px] rounded object-cover"
                          loading="lazy"
                        />
                      </td>
                      <td className="py-4 px-2 sm:p-3 text-primary">
                        {item.title}
                      </td>
                      <td className="py-4 px-2 sm:p-3">
                        <GenreDisplay item={item.genre} />
                      </td>
                      <td className="py-4 px-2 sm:p-3">
                        {item.release_date &&
                          format(new Date(item.release_date), "yyyy-MM-dd")}
                      </td>
                      <td className="py-4 px-2 sm:p-3">
                        {formatDuration(Number(item.runtime))}
                      </td>
                      <td className="py-4 px-2 sm:p-3">
                        <div className="flex flex-row gap-2 items-center justify-center">
                          <button className="size-[33px] flex justify-center items-center bg-primary rounded">
                            <IoMdEye className="text-white" />
                          </button>
                          <button className="size-[33px] flex justify-center items-center bg-violet-600 rounded">
                            <FaPen className="text-white" />
                          </button>
                          <button
                            className="size-[33px] flex justify-center items-center bg-red rounded"
                            onClick={() =>
                              handleDeleteWithAlert(item.id, item.title)
                            }
                          >
                            <FaTrash className="text-white" />
                          </button>
                        </div>
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
                  disabled={currentPageFromUrl === 1}
                  className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                    currentPageFromUrl === 1
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
                      to={`?release_month=${currentReleaseMonthFromUrl}&page=${number}`}
                      className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                        currentPageFromUrl === number
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
                  disabled={currentPageFromUrl === totalPages}
                  className={`size-8 sm:size-10 rounded-md flex items-center justify-center ${
                    currentPageFromUrl === totalPages
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
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0"></div>
              <div className="mx-2 w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Movie
                </h3>
                <hr className="border-gray3 border" />
              </div>
            </div>
            <div className="mx-2 mb-1">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete the movie "
                <strong>{item?.title}</strong>"?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteAlert}
                  className="px-4 py-[7px] text-sm bg-red text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const GenreDisplay = ({ item }) => {
  const genreNames = Array.isArray(item)
    ? item.filter((name) => typeof name === "string" && name.trim() !== "")
    : [];

  const displayedGenres = genreNames.slice(0, 2);

  return (
    <>
      {displayedGenres.length > 0 ? (
        displayedGenres.map((name, index) => (
          <span key={index} className="genre-tag">
            {name}
            {index < displayedGenres.length - 1 && ", "}
          </span>
        ))
      ) : (
        <span className="text-gray-500">Tidak ada genre</span>
      )}
    </>
  );
};

export default AdminMoviePage;
