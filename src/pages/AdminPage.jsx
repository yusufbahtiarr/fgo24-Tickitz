import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import graph from "../assets/images/graph.png";

function AdminPage() {
  const currentUser = useSelector((state) => state.auths.currentUser);

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-gray2 p-6 mt-21 sm:px-33 sm:py-11 gap-10">
        <div className="p-6 sm:px-15 sm:py-10 flex flex-col gap-8 sm:gap-10 bg-white rounded-xl">
          <div>
            <span className="text-2xl font-bold">Sales Chart</span>
          </div>
          <div>
            <form className="flex flex-col sm:flex-row gap-4">
              <select
                name="movie"
                id="movie"
                className="px-6 py-3 bg-gray1 rounded"
              >
                <option value="">Movies Name</option>
              </select>
              <select
                name="weekly"
                id="weekly"
                className="px-6 py-3 bg-gray1 rounded"
              >
                <option value="">Weekly</option>
              </select>
              <Button variant="third" className="h-[30px] text-white px-8">
                Filter
              </Button>
            </form>
          </div>
          <div>
            <span className="font-semibold">Avengers: End Game</span>
          </div>
          <div className="flex flex-row gap-4 sm:gap-6 overflow-x-hidden scroll-auto">
            <div className="flex flex-col justify-between pb-10 text-[12px] sm:text-[16px]">
              <span>$800</span>
              <span>$600</span>
              <span>$400</span>
              <span>$200</span>
              <span>$0</span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 overflow-x-hidden">
              <img src={graph} alt="graph" className="w-200" />
              <div className="flex flex-row justify-between px-6 text-[12px] sm:text-[16px]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 sm:px-15 sm:py-10 flex flex-col gap-8 sm:gap-10 bg-white rounded-xl">
          <div>
            <span className="text-2xl font-bold">Ticket Sales</span>
          </div>
          <div>
            <form className="flex flex-col sm:flex-row gap-4">
              <select
                name="category"
                id="category"
                className="px-6 py-3 bg-gray1 rounded"
              >
                <option value="">Category</option>
              </select>
              <select
                name="location"
                id="location"
                className="px-6 py-3 bg-gray1 rounded"
              >
                <option value="">Location</option>
              </select>
              <Button variant="third" className="h-[30px] text-white px-8">
                Filter
              </Button>
            </form>
          </div>
          <div>
            <span className="font-semibold">Adventure, Purwokerto</span>
          </div>
          <div className="flex flex-row gap-4 sm:gap-6">
            <div className="flex flex-col justify-between pb-10 text-[12px] sm:text-[16px]">
              <span>$800</span>
              <span>$600</span>
              <span>$400</span>
              <span>$200</span>
              <span>$0</span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 grow">
              <img src={graph} alt="graph" />
              <div className="flex flex-row justify-between px-6 text-[12px] sm:text-[16px]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
