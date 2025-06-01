import { useState } from "react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useForm } from "react-hook-form";
import { id as LocaleID } from "date-fns/locale";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addTempTicketAction } from "../redux/reducers/tickets";

function BookingTicket({ titleMovie }) {
  const currentUser = useSelector((state) => state.auths.currentUser);
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(currentUser);

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
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const cinemas = [
    {
      name: "ebv.id",
      image: "../src/assets/images/ebv-gray.png",
    },
    {
      name: "hiflix",
      image: "../src/assets/images/hiflix-gray.png",
    },
    {
      name: "cineone21",
      image: "../src/assets/images/cineone-gray.png",
    },
    {
      name: "xxi",
      image: "../src/assets/images/xxi.svg",
    },
  ];

  function Cinema({ register }) {
    const [selectedCinema, setSelectedCinema] = useState(null);
    return (
      <div className="flex gap-8 justify-center items-center w-full">
        {cinemas.map((cinema, index) => (
          <label
            key={index}
            className={`cursor-pointer border rounded-lg flex-1 flex items-center justify-center h-40 text-center my-auto w-32 transition-all
            ${
              selectedCinema === cinema.name
                ? "bg-primary/40 text-white"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <input
              {...register("cinema", { required: true })}
              type="radio"
              name="cinema"
              value={cinema.name}
              className="sr-only"
              onChange={() => setSelectedCinema(cinema.name)}
            />
            <span className={`text-lg`}>
              <img src={cinema.image} alt="cinema" className="w-50"></img>
            </span>
          </label>
        ))}
      </div>
    );
  }

  function onSubmit(data) {
    if (!data.date || !data.time || !data.location) return;
    data.idMovie = id;
    data.titleMovie = titleMovie;
    data.idUser = currentUser.id;

    dispatch(addTempTicketAction(data));
    navigate(`/buy-ticket/${id}/seat`, { replace: true });
    // console.log(data);
  }

  return (
    <div className="w-full h-fit p-20">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <span className="text-[36px] font-semibold">Book Tickets</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-5">
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="font-semibold text-[28px] px-">
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
                  <div className="font-semibold text-[28px] px-">
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
                  <div className="font-semibold text-[28px] px-">
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
                <span className="text-[28px] font-semibold">Choose Cinema</span>
              </div>
              <div className="flex flex-row gap-4 w-full">
                <Cinema register={register} />
              </div>
              <Button variant="primary" disabled={!currentUser}>
                {currentUser ? "BOOK NOW" : "Please login to book"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingTicket;
