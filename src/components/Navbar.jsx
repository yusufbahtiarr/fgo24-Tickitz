import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../redux/reducers/auths";

function Navbar() {
  const users = useSelector((state) => state.auths.currentUser);
  console.log(users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  function logout() {
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <nav className="fixed top-0 right-0 left-0 flex flex-between flex-row bg-white px-20 py-4 z-100 items-center justify-center ">
      <div className="flex-1">
        <img
          className="w-30"
          src="../src/assets/images/Tickitz.png"
          alt="logo"
        />
      </div>
      <div className="flex-1 flex font-light justify-center items-center text-l h-10 gap-15">
        <Link to="/">
          <div className="flex justify-center flex-col items-center font-dmsans">
            <span className="font-semibold">HOME</span>
            {/* <div className="h-[8px] flex justify-center w-[8px] bg-orange-500 rounded-full items-center"></div> */}
          </div>
        </Link>
        <Link to="/movies">MOVIE</Link>
        <Link to="/buy-ticket">BUY TICKET</Link>
        {users?.role === "Admin" && (
          <>
            <Link to="/admin">CHART</Link>
            <Link to="/admin-movie">LIST MOVIE</Link>
          </>
        )}
      </div>
      <div className="flex-1 flex gap-2 justify-end text-right">
        {!users ? (
          <div className="flex-1 flex gap-2 justify-end text-right">
            <Button variant="secondary">
              <Link to="/login">login</Link>
            </Button>
            <Button variant="primary">
              <Link to="/register">sign up</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-4 items-center relative">
            <span className="font-semibold">
              {users?.firstName
                ? `${users?.firstName} ${users?.lastName}`
                : users?.email.split("@")[0]}
            </span>
            <img
              src="../src/assets/images/profile.png"
              alt="profile"
              className="size-14 rounded-full object-cover"
              onClick={() => setDropdown(!dropdown)}
            />
            {dropdown && (
              <div className="absolute flex flex-col h-fit p-5 gap-4 top-19 right-0 z-99 bg-white shadow rounded w-46">
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 rounded text-white bg-primary  hover:bg-primary/80"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded text-white bg-primary hover:bg-primary/80"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
