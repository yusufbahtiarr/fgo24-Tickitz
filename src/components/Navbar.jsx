import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../redux/reducers/auths";
import logo from "../assets/images/logobluegreensmall.png";
import profile from "../assets/images/profile.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";
// import { fetchData } from "./../utils/apiClient";

function Navbar() {
  let authToken = useSelector((state) => state.auths.token);
  const userId =
    authToken && typeof authToken === "string"
      ? jwtDecode(authToken)?.userId
      : null;
  const role =
    authToken && typeof authToken === "string"
      ? jwtDecode(authToken)?.role
      : null;
  // console.log(userId);

  const [profiles, setProfiles] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  const getProfile = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await http(authToken).get(`/user/profile`);
      return response.data.results;
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const profileData = await getProfile();
        setProfiles(profileData);
      } catch (err) {
        throw err;
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  function logout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <nav className="fixed top-0 right-0 left-0 flex flex-row justify-between w-full bg-third px-6 sm:px-20 py-4 z-100 border-b border-gray1 shadow items-center">
      <div className="">
        <Link to="/">
          <img className="w-35 sm:w-40" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="  sm:flex hidden font-light justify-center items-center text-l h-10 gap-15">
        <Link to="/" className="font-semibold hover:text-primary">
          HOME
        </Link>
        <Link to="/movies" className="font-semibold hover:text-primary">
          MOVIE
        </Link>
        <Link to="/buy-ticket" className="font-semibold hover:text-primary">
          BUY TICKET
        </Link>
        {role === "admin" && (
          <>
            <Link to="/admin" className="font-semibold hover:text-primary">
              CHART
            </Link>
            <Link
              to="/admin-movie"
              className="font-semibold hover:text-primary"
            >
              LIST MOVIE
            </Link>
          </>
        )}
      </div>

      <div className="flex gap-2 justify-end text-right">
        <div>
          {hamburger ? (
            <>
              <IoMdClose
                className="flex sm:hidden  size-7"
                onClick={() => {
                  setHamburger(!hamburger);
                  setDropdown(!dropdown);
                }}
              />
            </>
          ) : (
            <GiHamburgerMenu
              className="flex sm:hidden  size-7"
              onClick={() => {
                setHamburger(!hamburger);
                setDropdown(!dropdown);
              }}
            />
          )}
        </div>
        {!authToken ? (
          <div className="flex-1 hidden sm:flex gap-2 justify-end text-right">
            <Button variant="secondary">
              <Link to="/login">login</Link>
            </Button>
            <Button variant="primary">
              <Link to="/register">sign up</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden sm:flex flex-row gap-4 items-center relative">
            <span className="font-semibold">
              {profiles?.fullname
                ? profiles?.fullname
                : profiles?.email.split("@")[0]}
            </span>
            <img
              src={profile}
              alt="profile"
              className="size-14 rounded-full object-cover"
              onClick={() => setDropdown(!dropdown)}
            />
          </div>
        )}
        {dropdown && (
          <div className="absolute flex flex-col sm:right-16 items-center justify-between h-fit p-5 gap-4 top-17 sm:top-23 right-0 z-99 bg-third shadow rounded w-full sm:w-50">
            <div className="flex sm:hidden flex-col gap-6 justify-between items-center mb-2">
              <Link to="/">
                <div className="flex justify-center flex-col items-center font-dmsans">
                  <span className="font-semibold hover:text-primary">HOME</span>
                  {/* <div className="h-[8px] flex justify-center w-[8px] bg-orange-500 rounded-full items-center"></div> */}
                </div>
              </Link>
              <Link to="/movies" className=" hover:text-primary">
                MOVIE
              </Link>
              <Link to="/buy-ticket" className=" hover:text-primary">
                BUY TICKET
              </Link>
              {role === "admin" && (
                <>
                  <Link to="/admin" className=" hover:text-primary">
                    CHART
                  </Link>
                  <Link to="/admin-movie" className=" hover:text-primary">
                    LIST MOVIE
                  </Link>
                </>
              )}
            </div>
            {!authToken ? (
              <div className="flex-1 flex sm:hidden gap-2 justify-end text-right">
                <Button variant="secondary">
                  <Link to="/login">login</Link>
                </Button>
                <Button variant="primary">
                  <Link to="/register">sign up</Link>
                </Button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setDropdown(!dropdown);
                    navigate("/profile");
                  }}
                  className="p-2 rounded text-white bg-primary  hover:bg-primary/80 w-full"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded text-white bg-primary hover:bg-primary/80 w-full"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
