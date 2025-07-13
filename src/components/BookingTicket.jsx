import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { id as LocaleID } from "date-fns/locale";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTempTicketAction } from "../redux/reducers/tickets";
// import ebv from "../assets/images/ebv-gray.png";
// import hiflix from "../assets/images/hiflix-gray.png";
// import cineone from "../assets/images/cineone-gray.png";
// import xxi from "../assets/images/xxi.svg";
import http from "../utils/axios";

function BookingTicket({ titleMovie, users }) {
  const { id: movieId } = useParams();
  const dispatch = useDispatch();
  const [fetchedShowtimes, setFetchedShowtimes] = useState([]);
  const [fetchedLocations, setFetchedLocations] = useState([]);
  const [fetchedCinemas, setFetchedCinemas] = useState([]);
  const formatTime = (timeString) => timeString?.substring(0, 5);

  function getDateOptions() {
    return [0, 1, 2].map((dayOffset) => {
      const date = addDays(new Date(), dayOffset);
      const label = format(date, "EEEE, dd MMMM yyyy", { locale: LocaleID });
      const value = format(date, "yyyy-MM-dd");
      return { label, value };
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [showtimeRes, locationRes, cinemaRes] = await Promise.all([
          http().get("movies/times"),
          http().get("movies/locations"),
          http().get("movies/cinemas"),
        ]);

        setFetchedShowtimes(showtimeRes.data.results || []);
        setFetchedLocations(locationRes.data.results || []);
        setFetchedCinemas(cinemaRes.data.results || []);
      } catch (err) {
        console.error(
          "Error fetching initial booking data:",
          err.response?.data || err.message
        );
        setFetchedShowtimes([]);
        setFetchedLocations([]);
        setFetchedCinemas([]);
      }
    };
    fetchInitialData();
  }, []);

  function onSubmit(data) {
    if (!data.date || !data.time || !data.location) return;
    data.idMovie = movieId;
    data.titleMovie = titleMovie;
    data.idUser = users.userId;
    data.cinema = selectedCinema;

    dispatch(addTempTicketAction(data));
    navigate(`/buy-ticket/${movieId}/seat`, { replace: true });
  }

  console.log(fetchedCinemas);

  return (
    <div className="w-full h-fit p-6 sm:p-20">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <span className="text-2xl sm:text-[36px] font-semibold">
            Book Tickets
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-xl sm:text-[28px] px-">
                    Choose Date
                  </div>
                  <div className="flex flex-row justify-between h-[54px] px-3 items-center border-1 border-black rounded-full">
                    <IoSearch className="size-[24px]" />
                    <select
                      name="date"
                      id="date"
                      {...register("date")}
                      className="outline-0 w-full p-2"
                    >
                      <option value="">Pilih Tanggal</option>
                      {getDateOptions().map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-xl sm:text-[28px] px-">
                    Choose Time
                  </div>
                  <div className="flex flex-row justify-between h-[54px] px-3 items-center border-1 border-black rounded-full">
                    <IoSearch className="size-[24px]" />
                    <select
                      name="time"
                      id="time"
                      {...register("time", { required: "Time is required" })}
                      className="outline-0 w-full p-2"
                    >
                      <option value="">Pilih Waktu</option>
                      {fetchedShowtimes.length > 0 ? (
                        fetchedShowtimes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {formatTime(item.time)}
                          </option>
                        ))
                      ) : (
                        <option disabled>No times available</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-xl sm:text-[28px] px-">
                    Choose Location
                  </div>
                  <div className="flex flex-row justify-between h-[54px] px-3 items-center border-1 border-black rounded-full">
                    <IoSearch className="size-[24px]" />
                    <select
                      name="location"
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="outline-0 w-full p-2"
                    >
                      <option value="">Pilih Lokasi</option>
                      {fetchedLocations.length > 0 ? (
                        fetchedLocations.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.location}
                          </option>
                        ))
                      ) : (
                        <option disabled>No locations available</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-5 items-center">
                <span className="text-xl sm:text-[28px] font-semibold">
                  Choose Cinema
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {fetchedCinemas.length > 0 ? (
                  fetchedCinemas.map((cinema) => (
                    <Cinema
                      key={cinema.id}
                      register={register}
                      value={cinema.id}
                      cinemaImage={cinema.image_url}
                      cinemaName={cinema.cinema_name}
                      selectedCinema={selectedCinema}
                      setSelectedCinema={setSelectedCinema}
                      idCinema={`cinema-${cinema.id}`}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No cinemas available.</p>
                )}
                {errors.cinema && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors.cinema.message}
                  </span>
                )}
              </div>
              <Button variant="primary" disabled={!users} type="submit">
                {users ? "BOOK NOW" : "Please login to book"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Cinema({
  register,
  value,
  // cinemaImage,
  cinemaName,
  selectedCinema,
  setSelectedCinema,
  idCinema,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
      <label
        className={`cursor-pointer border rounded-2xl
               w-full sm:flex-1 flex items-center justify-center min-h-40  sm:min-h-40 text-center my-auto sm:w-32 transition-all checked:bg-amber-200
            ${
              selectedCinema === value
                ? "bg-primary/40 text-white"
                : "bg-third text-black border-gray-300"
            }
            `}
        htmlFor={idCinema}
      >
        <input
          {...register("cinema")}
          type="radio"
          name="cinema"
          value={value}
          className="sr-only"
          onChange={() => {
            setSelectedCinema(value);
          }}
          id={idCinema}
        />
        <span className={`text-3xl font-bold`}>
          {cinemaName}
          {/* <img src={cinemaImage} alt="cinema" className="w-50"></img> */}
        </span>
      </label>
    </div>
  );
}

export default BookingTicket;
