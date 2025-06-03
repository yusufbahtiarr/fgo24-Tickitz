import Navbar from "../components/Navbar";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminNewMoviePage() {
  const currentUser = useSelector((state) => state.auths.currentUser);

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full">
        <div className="w-full sm:w-180 h-fit bg-white rounded-2xl mx-auto sm:max-w-180">
          <div className="p-6 pb-0 sm:p-10">
            <span className="text-[18px] sm:text-2xl">Add New Movie</span>
          </div>
          <form className="text-gray3 p-6 sm:p-0 sm:px-15 sm:pb-15 font-normal flex flex-col gap-5">
            <div className="flex flex-col w-26 text-[16px] gap-2">
              <span>Upload Image</span>
              <button className="p-1 bg-primary text-white rounded">
                Upload
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="movie">Movie Name</label>
              <input
                type="text"
                name="movie"
                id="movie"
                placeholder="Spider-Man: Homecoming"
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="movie">Category</label>
              <input
                type="text"
                name="movie"
                id="movie"
                placeholder="Action, Adventure, Sci-Fi"
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="movie">Release date</label>
                <input
                  type="text"
                  name="movie"
                  id="movie"
                  placeholder="07/05/2020"
                  className="border border-gray1 w-full px-4 py-3"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <label htmlFor="hour">Duration (hour / minute)</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="hour"
                    id="hour"
                    placeholder="2"
                    className="border border-gray1 w-full px-4 py-3 text-left sm:text-center"
                  />
                  <input
                    type="text"
                    name="minute"
                    id="minute"
                    placeholder="13"
                    className="border border-gray1 w-full px-4 py-3 text-left sm:text-center"
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
                placeholder="Jon Watts"
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cast">Cast</label>
              <input
                type="text"
                name="cast"
                id="cast"
                placeholder="Tom Holland, Michael Keaton, Robert Dow.."
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="synopsis">Synopsis</label>
              <textarea
                name="synopsis"
                id="sinopsys"
                placeholder="Thrilled by his experience with the Avengers, Peter returns home, where he
lives with his Aunt May, | "
                className="border border-gray1 w-full px-4 py-3 h-40"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Add Location</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Purwokerto, Bandung, Bekasi"
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-50">
              <label htmlFor="location">Set Date & Time</label>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="Set a date"
                className="border border-gray1 w-full px-4 py-3"
              />
            </div>
            <div className="flex flex-row justify-start items-center gap-8 w-full sm:w-50">
              <button className="border px-6 py-0 rounded border-primary">
                <LuPlus className="text-primary size-[30px]" />
              </button>
              <span className="text-sm">08:30am</span>
              <span className="text-sm">10:30pm</span>
            </div>
            <hr className="border border-gray1" />
            <button className="bg-primary text-white font-bold py-3 rounded">
              Save Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminNewMoviePage;
