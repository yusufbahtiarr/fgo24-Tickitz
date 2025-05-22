import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 flex flex-between flex-row  bg-white px-20 py-4 z-100 items-center justify-center ">
      <div className="flex-1">
        <img className="w-30" src="/src/assets/images/Tickitz.png" alt="logo" />
      </div>
      <div className="flex-1 flex font-light justify-center text-l h-10 gap-15">
        <Link to="/">
          <div className="flex justify-center flex-col items-center font-dmsans">
            <span className="font-semibold">HOME</span>
            <div className="h-[8px] flex justify-center w-[8px] bg-orange-500 rounded-full items-center"></div>
          </div>
        </Link>
        <Link to="/movies">MOVIE</Link>
        <Link to="/buy-ticket">BUY TICKET</Link>
      </div>
      <div className="flex-1 flex gap-2 justify-end text-right">
        <Button variant="secondary">
          <Link to="/login">login</Link>
        </Button>
        <Button variant="primary">
          {" "}
          <Link to="/register">sign up</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
