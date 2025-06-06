import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Charts from "../components/Charts";

function AdminPage() {
  const currentUser = useSelector((state) => state.auths.currentUser);

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="bg-gray2 min-h-[100vh] overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col p-6 mt-21 sm:px-33 sm:py-11 gap-10 w-full h-full sm:justify-center sm:w-full sm:items-center sm:w-330">
        <div className="p-6 sm:px-15 sm:py-10 flex sm:w-260 flex-col gap-8 sm:gap-10 bg-white rounded-xl">
          <div>
            <span className="text-[18px] sm:text-2xl font-bold">
              Sales Chart
            </span>
          </div>
          <div>
            <form className="flex flex-col sm:flex-row gap-4">
              <select
                name="movie"
                id="movie"
                className="px-6 py-4 bg-gray1 rounded"
              >
                <option value="">Movies Name</option>
                <option value="Snow White">Snow White</option>
                <option value="Lilo & Stitch">Lilo & Stitch</option>
                <option value="Sinners">Sinners</option>
                <option value="A Minecraft Movie">A Minecraft Movie</option>
                <option value="Shadow Force">Shadow Force</option>
                <option value="Until Dawn">Until Dawn</option>
                <option value="Warfare">Warfare</option>
                <option value="Fountain of Youth">Fountain of Youth</option>
                <option value="Avengers: End Game">Avengers: End Game</option>
              </select>
              <select
                name="period"
                id="period"
                className="px-6 py-4 bg-gray1 rounded"
              >
                <option value="">Period</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <Button variant="third" className="h-[30px] text-white px-8">
                Filter
              </Button>
            </form>
          </div>
          <div>
            <span className="font-semibold">Avengers: End Game</span>
          </div>
          <div className="flex flex-row gap-4 sm:gap-6 overflow-x-auto scroll-smooth">
            <Charts />
          </div>
        </div>
        <div className="p-6 sm:px-15 sm:py-10 flex sm:w-260 flex-col gap-8 sm:gap-10 bg-white rounded-xl">
          <div>
            <span className="text-[18px] sm:text-2xl font-bold">
              Ticket Sales
            </span>
          </div>
          <div>
            <form className="flex flex-col sm:flex-row gap-4">
              <select
                name="category"
                id="category"
                className="px-6 py-4 bg-gray1 rounded"
              >
                <option value="">Category</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Animation">Animation</option>
                <option value="Family">Family</option>
                <option value="Action">Action</option>
                <option value="Action">Horror</option>
                <option value="Action">Thriller</option>
              </select>
              <select
                name="location"
                id="location"
                className="px-6 py-4 bg-gray1 rounded"
              >
                <option value="">Location</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Depok">Depok</option>
                <option value="Bogor">Bogor</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Bekasi">Bekasi</option>
              </select>
              <Button variant="third" className="h-[30px] text-white px-8">
                Filter
              </Button>
            </form>
          </div>
          <div>
            <span className="font-semibold">Adventure, Purwokerto</span>
          </div>
          <div className="flex flex-row gap-4 sm:gap-6 overflow-x-auto scroll-smooth">
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
