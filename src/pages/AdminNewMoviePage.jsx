import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import { showNotif } from "./../utils/notif";
import { useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";

function AdminNewMoviePage() {
  const authToken = useSelector((state) => state.auths.token);
  const users = useMemo(() => {
    return authToken && typeof authToken === "string"
      ? jwtDecode(authToken)
      : null;
  }, [authToken]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = yup.object({
    title: yup.string().required("Judul Movie wajib diisi!"),
    poster: yup
      .mixed()
      .required("Poster file is required!")
      .test("fileSize", "File size must be less than 5MB", (value) => {
        return (
          !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
        );
      })
      .test("fileType", "File must be JPG, JPEG, or PNG", (value) => {
        return (
          !value ||
          (value instanceof File &&
            ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
        );
      }),
    backdrop: yup
      .mixed()
      .required("Backdrop file wajib diisi!")
      .test("fileSize", "File size must be less than 5MB", (value) => {
        return (
          !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
        );
      })
      .test("fileType", "File must be JPG, JPEG, or PNG", (value) => {
        return (
          !value ||
          (value instanceof File &&
            ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
        );
      }),
    release_date: yup
      .date()
      .typeError("Tanggal rilis harus berupa tanggal yang valid")
      .required("Tanggal rilis wajib diisi!")
      .min(
        new Date(1950, 0, 1),
        "Tanggal rilis tidak boleh sebelum 1 Januari 1950"
      ),
    hour: yup
      .number()
      .typeError("Durasi (jam) harus berupa angka")
      .min(0, "Jam tidak boleh kurang dari 0")
      .max(12, "Jam tidak boleh lebih dari 12")
      .integer("Durasi (jam) harus bilangan bulat")
      .required("Durasi (jam) wajib diisi!"),
    minute: yup
      .number()
      .typeError("Durasi (menit) harus berupa angka")
      .min(0, "Durasi (menit) tidak boleh kurang dari 0")
      .max(59, "Durasi (menit) tidak boleh lebih dari 59")
      .integer("Durasi (menit) harus bilangan bulat")
      .required("Durasi (menit) wajib diisi!"),
    overview: yup
      .string()
      .required("Overview wajib diisi!")
      .min(10, "Overview minimal 10 karakter")
      .max(500, "Overview maksimal 500 karakter"),
    rating: yup
      .number()
      .typeError("Rating harus berupa angka")
      .min(0, "Rating minimal 0.0")
      .max(10, "Rating maksimal 10.0")
      .required("Rating wajib diisi!"),
    genres: yup.string().required("Genre IDs wajib diisi!"),
    casts: yup.string().required("Cast IDs wajib diisi!"),
    directors: yup.string().required("Director IDs wajib diisi!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    setIsSubmitting(true);

    try {
      const runtime = data.hour * 60 + data.minute;
      const releaseDate = format(data.release_date, "yyyy-MM-dd");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("poster", data.poster || "");
      formData.append("backdrop", data.backdrop || "");
      formData.append("release_date", releaseDate);
      formData.append("runtime", runtime.toString());
      formData.append("overview", data.overview);
      formData.append("rating", data.rating.toString());
      formData.append("genres", data.genres);
      formData.append("casts", data.casts);
      formData.append("directors", data.directors);

      const response = await http(authToken).post("/admin/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        showNotif("success", "Data film baru berhasil ditambahkan!");
        reset();
        document.getElementById("poster-filename").textContent =
          "Choose poster file...";
        document.getElementById("backdrop-filename").textContent =
          "Choose backdrop file...";
      } else {
        showNotif("error", response.data.message || "Gagal menambahkan film");
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      showNotif(
        "error",
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan film"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!users || users.role !== "admin") {
    return <Navigate to="/login" replace />;
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
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="poster">Poster Image</label>
              <div className="relative">
                <input
                  {...register("poster")}
                  type="file"
                  name="poster"
                  id="poster"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setValue("poster", file, { shouldValidate: true });
                    if (file) {
                      document.getElementById("poster-filename").textContent =
                        file.name;
                    } else {
                      document.getElementById("poster-filename").textContent =
                        "Choose poster file...";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("poster").click()}
                  className="w-full px-4 py-3 border border-gray1 bg-white text-left hover:bg-primary/50 transition-colors"
                >
                  <span id="poster-filename" className="text-gray-500">
                    Choose poster file...
                  </span>
                </button>
              </div>
              {errors.poster && (
                <span className="text-red text-sm">
                  {errors.poster.message}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="backdrop">Backdrop Image</label>
              <div className="relative">
                <input
                  {...register("backdrop")}
                  type="file"
                  name="backdrop"
                  id="backdrop"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setValue("backdrop", file, { shouldValidate: true });
                    if (file) {
                      document.getElementById("backdrop-filename").textContent =
                        file.name;
                    } else {
                      document.getElementById("backdrop-filename").textContent =
                        "Choose backdrop file...";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("backdrop").click()}
                  className="w-full px-4 py-3 border border-gray1 bg-white text-left hover:bg-primary/50 transition-colors"
                >
                  <span id="backdrop-filename" className="text-gray-500">
                    Choose backdrop file...
                  </span>
                </button>
              </div>
              {errors.backdrop && (
                <span className="text-red text-sm">
                  {errors.backdrop.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="title">Movie Name</label>
              <input
                {...register("title")}
                type="text"
                name="title"
                id="title"
                placeholder="Input Movie Name"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
              <span className="text-red text-sm">{errors.title?.message}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="genres">Genre IDs</label>
              <input
                {...register("genres")}
                type="text"
                name="genres"
                id="genres"
                placeholder="Input Genre IDs (comma separated, e.g: 1,2,3)"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
              <span className="text-red text-sm">{errors.genres?.message}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="casts">Cast IDs</label>
              <input
                {...register("casts")}
                type="text"
                name="casts"
                id="casts"
                placeholder="Input Cast IDs (comma separated, e.g: 1,2,3)"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
              <span className="text-red text-sm">{errors.casts?.message}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="directors">Director IDs</label>
              <input
                {...register("directors")}
                type="text"
                name="directors"
                id="directors"
                placeholder="Input Director IDs (comma separated, e.g: 1,2,3)"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
              <span className="text-red text-sm">
                {errors.directors?.message}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="release_date">Release Date</label>
                <input
                  {...register("release_date")}
                  type="date"
                  name="release_date"
                  id="release_date"
                  className="border border-gray1 w-full px-4 py-3 outline-0"
                />
                <span className="text-red text-sm">
                  {errors.release_date?.message}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <label htmlFor="hour">Duration (hour / minute)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    {...register("hour")}
                    type="number"
                    name="hour"
                    id="hour"
                    placeholder="Hour"
                    className="border border-gray1 w-full px-4 py-3 outline-0 text-left sm:text-center"
                  />
                  <input
                    {...register("minute")}
                    type="number"
                    name="minute"
                    id="minute"
                    placeholder="Minute"
                    className="border border-gray1 w-full px-4 py-3 outline-0 text-left sm:text-center"
                  />
                </div>
                <span className="text-red text-sm">{errors.hour?.message}</span>
                <span className="text-red text-sm">
                  {errors.minute?.message}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rating">Rating (0.0 - 10.0)</label>
              <input
                {...register("rating")}
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="rating"
                id="rating"
                placeholder="Input Movie Rating"
                className="border border-gray1 w-full px-4 py-3 outline-0"
              />
              <span className="text-red text-sm">{errors.rating?.message}</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="overview">Overview</label>
              <textarea
                {...register("overview")}
                name="overview"
                id="overview"
                placeholder="Input Movie Overview"
                className="border border-gray1 w-full px-4 py-3 outline-0 h-40"
              ></textarea>
              <span className="text-red text-sm">
                {errors.overview?.message}
              </span>
            </div>

            <hr className="border border-gray1" />
            <button
              type="submit"
              className="bg-primary text-white font-bold py-3 rounded disabled:bg-gray2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Movie"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminNewMoviePage;
