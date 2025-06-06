import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AdminNewMoviePage() {
  const currentUser = useSelector((state) => state.auths.currentUser);
  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  const schema = yup.object({
    titleMovie: yup.string().required("Judul Movie wajib diisi!"),
    category: yup.string().required("Kategori wajib diisi!"),
    // releaseDate: yup
    //   .date()
    //   .typeError("Tanggal rilis harus berupa tanggal yang valid")
    //   .required("Tanggal rilis wajib diisi!")
    //   .min(
    //     new Date(1900, 0, 1),
    //     "Tanggal rilis tidak boleh sebelum 1 Januari 1900"
    //   )
    //   .max(new Date(), "Tanggal rilis boleh melebihi hari ini"),
    hour: yup
      .number()
      .typeError("Durasi (jam) harus berupa angka")
      .min(0, "Jam tidak boleh kurang dari 0")
      .max(12, "jam tidak boleh lebih dari 12")
      .integer("Durasi (jam) harus bilangan bulat")
      .required("Durasi (jam) wajib diisi!"),
    minute: yup
      .number()
      .typeError("Durasi (menit) harus berupa angka")
      .min(0, "Durasi (menit) tidak boleh kurang dari 0")
      .max(59, "Durasi (menit) tidak boleh lebih dari 59")
      .integer("Durasi (menit) harus bilangan bulat")
      .required("Durasi (menit) wajib diisi!"),
    director: yup.string().required("Director wajib diisi!"),
    cast: yup.string().required("Cast wajib diisi!"),
    // synopsis: yup
    //   .string()
    //   .required("Synopsis wajib diisi!")
    //   .min(10, "Synopsis minimal 10 karakter")
    //   .max(500, "Synopsis maksimal 500 karakter"),
    // location: yup
    //   .array()
    //   .of(
    //     yup
    //       .string()
    //       .oneOf(
    //         ["Jakarta", "Bogor", "Depok", "Bekasi", "Tangerang"],
    //         "Lokasi harus salah satu dari: Jakarta, Bogor, Depok, Bekasi, Tangerang"
    //       )
    //   )
    //   .min(1, "Pilih minimal satu lokasi!")
    //   .required("Lokasi wajib diisi!"),
    // date: yup
    //   .date()
    //   .typeError("Tanggal harus berupa tanggal yang valid")
    //   .required("Tanggal wajib diisi!")
    //   .min(new Date(1900, 0, 1), "Tanggal tidak boleh sebelum 1 Januari 1900")
    //   .max(new Date(), "Tanggal tidak boleh melebihi hari ini"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log(data);
    // reset();
  }

  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="w-full sm:w-180 h-fit bg-white rounded-2xl mx-auto sm:max-w-180">
          <div className="p-6 pb-0 sm:p-10">
            <span className="text-[18px] sm:text-2xl">Add New Movie</span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-gray3 p-6 sm:p-0 sm:px-15 sm:pb-15 font-normal flex flex-col gap-5"
            autoComplete="off"
          >
            <div className="flex flex-col w-26 text-[16px] gap-2">
              <span>Upload Image</span>
              <button className="p-1 bg-primary text-white rounded">
                Upload
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="titleMovie">Movie Name</label>
              <input
                {...register("titleMovie")}
                type="text"
                name="titleMovie"
                id="titleMovie"
                placeholder="Spider-Man: Homecoming"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
            </div>
            <span className="text-red text-sm">
              {errors.titleMovie?.message}
            </span>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <input
                {...register("category")}
                type="text"
                name="category"
                id="category"
                placeholder="Action, Adventure, Sci-Fi"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
            </div>
            <span className="text-red text-sm">{errors.category?.message}</span>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="releaseDate">Release date</label>
                <input
                  {...register("releaseDate")}
                  type="date"
                  name="releaseDate"
                  id="releaseDate"
                  placeholder="07/05/2020"
                  className="border border-gray1 w-full px-4 py-3 outline-0"
                />
              </div>
              <span className="text-red text-sm">
                {errors.releaseDate?.message}
              </span>
              <div className="flex-1 flex flex-col justify-between">
                <label htmlFor="hour">Duration (hour / minute)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    {...register("hour")}
                    type="text"
                    name="hour"
                    id="hour"
                    placeholder="2"
                    className="border border-gray1 w-full px-4 py-3 outline-0 text-left sm:text-center"
                  />
                  <input
                    {...register("minute")}
                    type="text"
                    name="minute"
                    id="minute"
                    placeholder="13"
                    className="border border-gray1 w-full px-4 py-3 outline-0 text-left sm:text-center"
                  />
                </div>
              </div>
            </div>
            <span className="text-red text-sm">{errors.hour?.message}</span>
            <span className="text-red text-sm">{errors.minute?.message}</span>
            <div className="flex flex-col gap-2">
              <label htmlFor="director">Director Name</label>
              <input
                {...register("director")}
                type="text"
                name="director"
                id="director"
                placeholder="Jon Watts"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
            </div>
            <span className="text-red text-sm">{errors.director?.message}</span>
            <div className="flex flex-col gap-2">
              <label htmlFor="cast">Cast</label>
              <input
                {...register("cast")}
                type="text"
                name="cast"
                id="cast"
                placeholder="Tom Holland, Michael Keaton, Robert Dow.."
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
            </div>
            <span className="text-red text-sm">{errors.cast?.message}</span>
            <div className="flex flex-col gap-2">
              <label htmlFor="sinopsys">Synopsis</label>
              <textarea
                {...register("sinopsys")}
                name="sinopsys"
                id="sinopsys"
                placeholder="Thrilled by his experience with the Avengers, Peter returns home, where he
lives with his Aunt May, | "
                className="border border-gray1 w-full px-4 py-3 outline-0 h-40"
              ></textarea>
            </div>
            <span className="text-red text-sm">{errors.sinopsys?.message}</span>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Location</label>
              <select
                {...register("location")}
                name="location"
                id="location"
                multiple
                className="border border-gray-300 w-full px-4 py-3 outline-none h-32"
              >
                <option value="Jakarta">Jakarta</option>
                <option value="Bogor">Bogor</option>
                <option value="Depok">Depok</option>
                <option value="Bekasi">Bekasi</option>
                <option value="Tangerang">Tangerang</option>
              </select>
              {errors.location && (
                <span className="text-red text-sm">
                  {errors.location.message}
                </span>
              )}
            </div>
            {/* <span className="text-red">{errors.location?.message}</span> */}
            {/* <div className="flex flex-col gap-2 w-full sm:w-50">
              <label htmlFor="date">Set Date & Time</label>
              <input
                {...register("date")}
                type="date"
                name="date"
                id="date"
                placeholder="Set a date"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
            </div>
            <span className="text-red">{errors.date?.message}</span>
            <div className="flex flex-row justify-start items-center gap-8 w-full sm:w-50">
              <button className="border px-6 py-0 rounded border-primary">
                <LuPlus className="text-primary size-[30px]" />
              </button>
              <span className="text-sm">08:30am</span>
              <span className="text-sm">10:30pm</span>
            </div> */}
            <hr className="border border-gray1" />
            <button
              type="Submit"
              className="bg-primary text-white font-bold py-3 rounded"
            >
              Save Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input(
  register,
  name,
  id,
  type,
  children,
  className,
  placeholder,
  ...props
) {
  return (
    <div className="flex flex-col gap-2 w-full sm:w-50">
      <label htmlFor={id}>{children}</label>
      <input
        {...register({ name })}
        type={type}
        name={name}
        id={id}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default AdminNewMoviePage;
