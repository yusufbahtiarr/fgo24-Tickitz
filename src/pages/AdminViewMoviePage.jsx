import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

function AdminViewMoviePage() {
  const { id } = useParams();
  const authToken = useSelector((state) => state.auths.token);
  const [movie, setMovie] = useState(null);
  const users = useMemo(() => {
    return authToken && typeof authToken === "string"
      ? jwtDecode(authToken)
      : null;
  }, [authToken]);

  const fetchMovie = useCallback(async () => {
    const response = await http(authToken).get(`/admin/movies/${id}`);
    setMovie(response.data.results);
  }, [authToken, id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  if (!users || users.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="w-full sm:w-180 h-fit bg-white rounded-2xl mx-auto sm:max-w-180">
          <div className="p-6 pb-0 sm:p-10">
            <span className="text-[18px] sm:text-2xl">Detail Movie</span>
          </div>
          <div className="text-gray3 p-6 sm:p-0 sm:px-15 sm:pb-15 font-normal flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="poster">Poster</label>
                <img
                  src={movie?.poster_url}
                  alt="Poster"
                  className="w-40 h-auto rounded-md border"
                />
                <input
                  type="text"
                  name="poster"
                  id="poster"
                  className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                  defaultValue={movie?.poster_url}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="poster">Backdrop</label>
                <img
                  src={movie?.backdrop_url}
                  alt="Poster"
                  className="w-70 h-auto rounded-md border"
                />
                <input
                  type="text"
                  name="backdrop"
                  id="backdrop"
                  className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                  defaultValue={movie?.backdrop_url}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Movie Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                defaultValue={movie?.title}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category/Genre</label>
              <input
                type="text"
                name="category"
                id="category"
                className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                defaultValue={movie?.genre.join(", ")}
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="release_date">Release date</label>
                <input
                  type="text"
                  name="release_date"
                  id="release_date"
                  className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                  defaultValue={
                    movie?.release_date &&
                    format(new Date(movie?.release_date), "d MMMM yyyy", {
                      locale: localeID,
                    })
                  }
                  disabled
                />
                <span className="text-red text-sm"></span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex-1 flex flex-col justify-between">
                <label htmlFor="duration">Duration (minute)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                    defaultValue={movie?.runtime}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="director">Director Name</label>
              <input
                type="text"
                name="director"
                id="director"
                className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary"
                defaultValue={movie?.director}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cast">Cast</label>
              <textarea
                name="cast"
                id="cast"
                className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary resize-none"
                defaultValue={movie?.cast.join(", ")}
                disabled
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="synopsis">Synopsis</label>
              <textarea
                name="synopsis"
                id="synopsis"
                className="border border-gray1 w-full px-4 py-3 outline-0 text-secondary h-40 resize-none"
                defaultValue={movie?.overview}
                disabled
              ></textarea>
            </div>
            <hr className="border border-gray1" />
          </div>
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

export default AdminViewMoviePage;
