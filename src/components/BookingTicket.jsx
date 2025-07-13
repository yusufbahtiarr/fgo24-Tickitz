import { useState } from "react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { id as LocaleID } from "date-fns/locale";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTempTicketAction } from "../redux/reducers/tickets";
import ebv from "../assets/images/ebv-gray.png";
import hiflix from "../assets/images/hiflix-gray.png";
import cineone from "../assets/images/cineone-gray.png";
import xxi from "../assets/images/xxi.svg";

function BookingTicket({ titleMovie, users }) {
  // const [btnBook, setBtnBook] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  function getDateOptions() {
    return [0, 1, 2].map((dayOffset) => {
      const date = addDays(new Date(), dayOffset);
      const label = format(date, "EEEE, dd MMMM yyyy", { locale: LocaleID }); // Untuk ditampilkan
      const value = format(date, "yyyy-MM-dd"); // Untuk disimpan
      return { label, value };
    });
  }

  const showtime = ["13:15", "15:45", "17:30", "18:40", "20:00", "22:15"];
  const location = ["Jakarta", "Depok", "Tangerang", "Bogor", "Bekasi"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [selectedCinema, setSelectedCinema] = useState(null);

  function Cinema({
    register,
    value,
    cinemaImage,
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
          <span className={`text-lg`}>
            <img src={cinemaImage} alt="cinema" className="w-50"></img>
          </span>
        </label>
      </div>
    );
  }

  function onSubmit(data) {
    if (!data.date || !data.time || !data.location) return;
    data.idMovie = id;
    data.titleMovie = titleMovie;
    data.idUser = users.userId;
    data.cinema = selectedCinema;

    dispatch(addTempTicketAction(data));
    navigate(`/buy-ticket/${id}/seat`, { replace: true });
  }

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
                      // required
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
                      {...register("time")}
                      className="outline-0 w-full p-2"
                    >
                      <option value="">Pilih Waktu</option>
                      {showtime.map((item, index) => (
                        <option key={`time-${index}`} className="p-10">
                          {item}
                        </option>
                      ))}
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
                      {...register("location")}
                      className="outline-0 w-full p-2"
                      // required
                    >
                      <option value="">Pilih Lokasi</option>
                      {location.map((item, index) => (
                        <option key={`location-${index}`} className="p-10">
                          {item}
                        </option>
                      ))}
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
                <Cinema
                  register={register}
                  value="ebv.id"
                  cinemaImage={ebv}
                  selectedCinema={selectedCinema}
                  setSelectedCinema={setSelectedCinema}
                  idCinema="cinema-1"
                />
                <Cinema
                  register={register}
                  value="hiflix"
                  cinemaImage={hiflix}
                  selectedCinema={selectedCinema}
                  setSelectedCinema={setSelectedCinema}
                  idCinema="cinema-2"
                />
                <Cinema
                  register={register}
                  value="cineone21"
                  cinemaImage={cineone}
                  selectedCinema={selectedCinema}
                  setSelectedCinema={setSelectedCinema}
                  idCinema="cinema-3"
                />
                <Cinema
                  register={register}
                  value="xxi"
                  cinemaImage={xxi}
                  selectedCinema={selectedCinema}
                  setSelectedCinema={setSelectedCinema}
                  idCinema="cinema-4"
                />
                {errors.cinema && (
                  <span className="text-red-500 text-sm mt-2">{"error"}</span>
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

export default BookingTicket;
