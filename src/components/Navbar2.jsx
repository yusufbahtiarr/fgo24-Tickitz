import { Link } from "react-router-dom";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

function Navbar2() {
  return (
    <nav className="fixed top-0 right-0 left-0 flex flex-between flex-row  bg-white px-20 py-4 z-100 items-center justify-center ">
      <div className="flex-1">
        <img className="w-30" src="/src/assets/images/Tickitz.png" alt="logo" />
      </div>
      <div className="flex-1 flex font-light justify-center items-center text-l h-10 gap-15">
        <Link to="/">
          <span className="font-semibold">HOME</span>
        </Link>
        <Link to="/movies">MOVIE</Link>
        <Link to="/buy-ticket">BUY TICKET</Link>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="flex flex-row gap-4 items-center">
          <span className="font-semibold">Location</span>
          <button>
            <FaAngleDown className="size-[18px]" />
          </button>
          <button>
            <IoSearchSharp className="size-[24px]" />
          </button>
          <img
            src="./src/assets/images/profile.png"
            alt="profile"
            className="size-14 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
