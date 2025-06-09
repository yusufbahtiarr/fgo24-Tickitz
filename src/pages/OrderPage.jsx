import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "./../components/Badge";
import Button from "./../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { fetchData } from "../utils/apiClient";
import RenderGenres from "../components/RenderGenres";
import { useDispatch, useSelector } from "react-redux";
import { id as LocaleID } from "date-fns/locale";
import { format } from "date-fns";
import { addTempTicketAction } from "../redux/reducers/tickets";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

function OrderPage() {
  const [movies, setMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const tempTicket = useSelector((state) => state.tickets.tempTicket);
  const dataTicket = useSelector((state) => state.tickets.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredHistory = useMemo(() => {
    return dataTicket.filter(
      (item) =>
        item.titleMovie === tempTicket.titleMovie &&
        item.location === tempTicket.location &&
        item.cinema === tempTicket.cinema &&
        item.time === tempTicket.time &&
        item.date === tempTicket.date
    );
  }, [dataTicket, tempTicket]);

  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const cols = 14;

  const [seats, setSeats] = useState(() =>
    Array(rows.length)
      .fill(null)
      .map(() => Array(cols).fill("available"))
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  // const seatsSold = filteredHistory.map((item) => item.seats);

  const fetchDataAll = async () => {
    try {
      const movieRes = await fetchData.getNowPlaying();
      setMovies(movieRes.data.results || []);

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

  const parseSeat = (seat) => {
    if (!seat || typeof seat !== "string") return null;
    const rowLetter = seat[0];
    const colNumber = parseInt(seat.slice(1), 10);
    const rowIndex = rows.indexOf(rowLetter);
    const colIndex = colNumber - 1;

    if (
      rowIndex >= 0 &&
      rowIndex < rows.length &&
      colIndex >= 0 &&
      colIndex < cols
    ) {
      return [rowIndex, colIndex];
    }
    return null;
  };

  useEffect(() => {
    console.log("useEffect running with filteredHistory:", filteredHistory);
    // Initialize seats as available
    const newSeats = Array(rows.length)
      .fill(null)
      .map(() => Array(cols).fill("available"));

    // Mark sold seats from filteredHistory
    const soldSeats = filteredHistory
      .flatMap((item) => item.seats)
      .map(parseSeat)
      .filter((seat) => seat !== null);

    soldSeats.forEach(([rowIndex, colIndex]) => {
      newSeats[rowIndex][colIndex] = "sold";
    });

    // Preserve selected seats
    selectedSeats.forEach((seat) => {
      const parsed = parseSeat(seat);
      if (parsed) {
        const [rowIndex, colIndex] = parsed;
        if (newSeats[rowIndex][colIndex] !== "sold") {
          newSeats[rowIndex][colIndex] = "selected";
        } else {
          // Hapus kursi yang sudah terjual dari selectedSeats
          setSelectedSeats((prev) => prev.filter((s) => s !== seat));
        }
      }
    });

    setSeats(newSeats);
  }, [filteredHistory]);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const updatedSeats = [...seats];
    const seatId = `${rows[rowIndex]}${colIndex + 1}`;
    const currentStatus = updatedSeats[rowIndex][colIndex];

    if (currentStatus === "sold" || currentStatus === "lovenest") return;

    if (currentStatus === "selected") {
      updatedSeats[rowIndex][colIndex] = "available";
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      updatedSeats[rowIndex][colIndex] = "selected";
      setSelectedSeats([...selectedSeats, seatId]);
    }

    setSeats(updatedSeats);
  };

  const cinemas = [
    {
      name: "ebv.id",
      image: "/src/assets/images/ebv-gray.png",
    },
    {
      name: "hiflix",
      image: "/src/assets/images/hiflix-gray.png",
    },
    {
      name: "cineone21",
      image: "/src/assets/images/cineone-gray.png",
    },
    {
      name: "xxi",
      image: "/src/assets/images/xxi.svg",
    },
  ];

  const ticketPrice = 60000;
  const totalPayment = selectedSeats.length * ticketPrice;

  function onSubmit() {
    const data = {
      seats: selectedSeats,
      totalPayment: totalPayment,
    };

    dispatch(addTempTicketAction(data));
    navigate(`/payment`, { replace: true });
  }

  const movieId = movies?.find((movie) => movie.id == id);
  const imageCinema =
    cinemas?.find((item) => item.name === tempTicket.cinema)?.image || "";

  return (
    <div className="w-screen h-screen bg-gray2 *:box-border *:*:box-border overflow-x-hidden">
      <Navbar />
      <div className="h-fit w-full mt-23 sm:mt-21 p-6 sm:p-0 sm:px-43">
        <Stepper step2="bg-primary" step3="bg-violet" />
        <section className="w-full h-full flex flex-col sm:flex-row gap-8 mb-20">
          <div className="w-full sm:w-300 py-3 sm:py-10 px-3 flex flex-col gap-10  bg-white">
            <div className="border flex flex-col sm:flex-row border-gray1 gap-4 py-4 px-6 w-full">
              <div className="h-[300px] sm:h-[117px] sm:w-[184px] overflow-y-hidden shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieId?.poster_path}`}
                  alt="film"
                  className="object-cover position-center w-full h-full"
                />
              </div>
              <div className=" flex gap-4 sm:gap-2 flex-col items-center sm:items-start justify-between w-full">
                <span className="text-2xl font-semibold">{movieId?.title}</span>
                <div className="flex flex-row gap-3">
                  <RenderGenres
                    genreIds={movieId?.genre_ids}
                    genresList={genresList}
                  />
                </div>
                <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between sm: w-full items-center sm:items-left">
                  <span>Regular - {tempTicket.time}</span>
                  <Button
                    variant="third"
                    className="rounded py-2 px-5 h-fit text-white font-medium"
                    onClick={() => navigate("/movies")}
                  >
                    Change
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full p-2 sm:px-15">
              <h2 className="sm:text-2xl text-[18px] font-bold mb-4">
                Choose Your Seat
              </h2>
              <div className="mb-4 text-center">Screen</div>

              <div className="overflow-x-auto">
                <div className="flex justify-center sm:justify-start">
                  <div className="hidden sm:flex flex-col mr-1 gap-2">
                    {/* Row A-G */}
                    {rows.map((row, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-11 sm:h-11  flex items-center justify-center"
                      >
                        {row}
                      </div>
                    ))}
                  </div>
                  <div>
                    {/* Seat */}
                    {rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-2 mb-2">
                        {Array(cols)
                          .fill(null)
                          .map((_, colIndex) => {
                            const status = seats[rowIndex][colIndex];
                            const isDisabled =
                              status === "sold" || status === "lovenest";

                            return (
                              <label
                                key={`${rowIndex}-${colIndex}`}
                                className="w-6 h-6 sm:w-11 sm:h-11 rounded flex items-center justify-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={status === "selected"}
                                  disabled={isDisabled}
                                  onChange={() =>
                                    handleCheckboxChange(rowIndex, colIndex)
                                  }
                                />
                                <div
                                  className={`w-full h-full ${
                                    status === "selected"
                                      ? "bg-orange-500"
                                      : status === "sold"
                                      ? "bg-gray-500"
                                      : status === "lovenest"
                                      ? "bg-pink-400"
                                      : "bg-gray-200"
                                  } rounded`}
                                ></div>
                              </label>
                            );
                          })}
                      </div>
                    ))}
                    {/* Column 1-14 */}
                    <div className="hidden sm:flex gap-2">
                      {Array(cols)
                        .fill(null)
                        .map((_, colIndex) => (
                          <div
                            key={colIndex}
                            className="w-6 h-6 sm:w-11 sm:h-11  flex items-center justify-center"
                          >
                            {colIndex + 1}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 px-2">
                <h3 className="font-semibold mb-2">Seating key</h3>
                <div className="flex mt-6 sm:mt-0 sm:gap-29 flex-wrap sm:flex-nowrap">
                  <div className="sm:hidden flex items-center gap-2 w-1/2 mb-8 sm:mb-0">
                    <FaArrowDown /> A - G
                  </div>
                  <div className="sm:hidden flex items-center gap-2 w-1/2 mb-8 sm:mb-0">
                    <FaArrowRight /> 1 - 14
                  </div>
                  <div className="flex items-center gap-2 w-1/2 mb-8 sm:mb-0">
                    <div className="w-6 h-6 border border-gray-400 bg-white rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/2  mb-8 sm:mb-0">
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/2  mb-8 sm:mb-0">
                    <div className="w-6 h-6 bg-pink-400 rounded"></div>
                    <span>Love nest</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/2  mb-8 sm:mb-0">
                    <div className="w-6 h-6 bg-gray-500 rounded"></div>
                    <span>Sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-[35%] flex flex-col">
            <div className="p-6 flex flex-col justify-center items-center  bg-white h-fit rounded">
              <div className="p-2">
                <img src={imageCinema} alt="bioskop" className="p-6 w-60" />
              </div>
              <div className="mx-auto text-2xl font-semibold mb-10 capitalize">
                {tempTicket.cinema} Cinema
              </div>
              <div className="flex flex-col w-full gap-4 mb-8">
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">Movie selected</span>
                  <span className="font-semibold text-sm">
                    {tempTicket.titleMovie}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm">
                    {format(tempTicket.date, "EEEE, dd MMMM yyyy", {
                      locale: LocaleID,
                    })}
                  </span>
                  <span className="font-semibold text-sm">
                    {tempTicket.time}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm text-gray-600">
                    One ticket price
                  </span>
                  <span className="font-semibold text-sm">
                    Rp. {ticketPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-normal text-sm shrink-0 pr-15">
                    Seat choosed
                  </span>
                  <span className="font-semibold text-sm">
                    {selectedSeats.join(", ") || "-"}
                  </span>
                </div>
              </div>
              <hr className="border border-gray1 w-full mb-6" />
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[18px] font-semibold">Total Payment</span>
                <span className="text-primary text-2xl font-bold">
                  Rp. {totalPayment.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <Button
              variant="third"
              className="text-white mt-10"
              onClick={() => {
                onSubmit();
              }}
              disabled={selectedSeats.length === 0}
            >
              Checkout now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
