import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "./../components/Badge";
import Button from "./../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import RenderGenres from "../components/RenderGenres";
import { useDispatch, useSelector } from "react-redux";
import { id as LocaleID } from "date-fns/locale";
import { format } from "date-fns";
import { addTempTicketAction } from "../redux/reducers/tickets";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import http from "../utils/axios";
import { jwtDecode } from "jwt-decode";

const ROWS = ["A", "B", "C", "D", "E", "F", "G"];
const COLS = 14;

function OrderPage() {
  const tempTicket = useSelector((state) => state.tickets.tempTicket);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auths.token);
  const users =
    authToken && typeof authToken === "string" ? jwtDecode(authToken) : null;

  const [seats, setSeats] = useState(() =>
    Array(ROWS.length)
      .fill(null)
      .map(() => Array(COLS).fill("available"))
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const parseSeat = useCallback((seat) => {
    if (!seat || typeof seat !== "string") return null;
    const rowLetter = seat[0];
    const colNumber = parseInt(seat.slice(1), 10);
    const rowIndex = ROWS.indexOf(rowLetter);
    const colIndex = colNumber - 1;

    if (
      rowIndex >= 0 &&
      rowIndex < ROWS.length &&
      colIndex >= 0 &&
      colIndex < COLS
    ) {
      return [rowIndex, colIndex];
    }
    return null;
  }, []);

  const fetchDataAll = useCallback(async () => {
    try {
      const bookedSeatsRes = await http(authToken).get(
        `transactions/booked-seats`,
        {
          params: {
            movie_id: tempTicket.idMovie,
            date: tempTicket.date,
            time_id: tempTicket.idTime,
            location_id: tempTicket.idLocation,
            cinema_id: tempTicket.idCinema,
          },
        }
      );
      const fetchedSoldSeats = bookedSeatsRes.data.results || [];

      setSeats((prevSeats) => {
        const newSeats = Array(ROWS.length)
          .fill(null)
          .map(() => Array(COLS).fill("available"));

        fetchedSoldSeats.forEach((seat) => {
          const parsed = parseSeat(seat);
          if (parsed) {
            const [rowIndex, colIndex] = parsed;
            newSeats[rowIndex][colIndex] = "sold";
          }
        });

        selectedSeats.forEach((seat) => {
          const parsed = parseSeat(seat);
          if (parsed) {
            const [rowIndex, colIndex] = parsed;
            if (newSeats[rowIndex][colIndex] !== "sold") {
              newSeats[rowIndex][colIndex] = "selected";
            } else {
              setSelectedSeats((prev) => prev.filter((s) => s !== seat));
            }
          }
        });
        return newSeats;
      });
    } catch (error) {
      // console.error(
      //   "Error fetching data:",
      //   error.response?.data || error.message
      // );
    }
  }, [
    authToken,
    tempTicket.idMovie,
    tempTicket.date,
    tempTicket.idTime,
    tempTicket.idLocation,
    tempTicket.idCinema,
    parseSeat,
    selectedSeats,
  ]);

  useEffect(() => {
    if (
      tempTicket.idMovie &&
      tempTicket.date &&
      tempTicket.idTime &&
      tempTicket.idLocation &&
      tempTicket.idCinema
    ) {
      fetchDataAll();
    }
  }, [
    tempTicket.idMovie,
    tempTicket.date,
    tempTicket.idTime,
    tempTicket.idLocation,
    tempTicket.idCinema,
    authToken,
    fetchDataAll,
  ]);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row) => [...row]);
      const seatId = `${ROWS[rowIndex]}${colIndex + 1}`;
      const currentStatus = updatedSeats[rowIndex][colIndex];

      if (currentStatus === "sold" || currentStatus === "lovenest")
        return prevSeats;

      if (currentStatus === "selected") {
        updatedSeats[rowIndex][colIndex] = "available";
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      } else {
        updatedSeats[rowIndex][colIndex] = "selected";
        setSelectedSeats([...selectedSeats, seatId]);
      }
      return updatedSeats;
    });
  };

  const ticketPrice = 50000;
  const totalPayment = selectedSeats.length * ticketPrice;

  function onSubmit() {
    const data = {
      seats: selectedSeats,
      totalPayment: totalPayment,
    };

    dispatch(addTempTicketAction(data));
    navigate(`/payment`, { replace: true });
  }

  if (!users || users.userId == null) {
    return <Navigate to="/login" replace />;
  }

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
                  src={tempTicket.posterPath}
                  alt="film"
                  className="object-cover position-center w-full h-full"
                />
              </div>
              <div className=" flex gap-4 sm:gap-2 flex-col items-center sm:items-start justify-between w-full">
                <span className="text-2xl font-semibold">
                  {tempTicket?.titleMovie}
                </span>
                <div className="flex flex-row gap-3">
                  <RenderGenres genres={tempTicket?.genre} />
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
                    {ROWS.map((row, i) => (
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
                    {ROWS.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-2 mb-2">
                        {Array(COLS)
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
                                      ? "bg-primary"
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
                      {Array(COLS)
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
                    <div className="w-6 h-6 bg-primary rounded"></div>
                    <span>Selected</span>
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
                <img
                  src={tempTicket.cinemaImage}
                  alt="bioskop"
                  className="p-6 w-60"
                />
              </div>
              <div className="mx-auto text-2xl font-semibold mb-10 capitalize">
                {tempTicket.cinema}
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
