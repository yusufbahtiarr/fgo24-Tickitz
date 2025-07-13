import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { showNotif } from "../utils/notif";
import logo from "../assets/images/logowhite.png";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";
import { setCredentials } from "../redux/reducers/auths";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authToken = useSelector((state) => state.auths.token);

  useEffect(() => {
    const role =
      authToken && typeof authToken === "string"
        ? jwtDecode(authToken)?.role
        : null;
    if (role === "admin") navigate("/admin");
    else if (role === "user") navigate("/profile");
    else navigate("/login");
  }, [authToken, navigate]);

  const schema = yup.object({
    email: yup
      .string()
      .email("Format Tidak Valid")
      .required("Email wajib diisi"),
    password: yup.string().required("Password wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await http().post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      const token = response.data.results;

      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;

      dispatch(setCredentials(token));

      if (role === "user") {
        showNotif("success", "Anda berhasil login");
        navigate("/profile");
      } else if (role === "admin") {
        showNotif("success", "Anda login sebagai Admin");
        navigate("/admin");
      } else {
        throw new Error("Role tidak valid");
      }
      activeBtn();
    } catch {
      showNotif("error", "Login gagal.");
      activeBtn();
    }
  };

  const activeBtn = () =>
    setTimeout(() => {
      setIsSubmitting(false);
    }, 4000);

  return (
    <div className="w-screen h-screen bg-[url(../src/assets/images/background.png)] object-cover bg-no-repeat bg-center">
      <div className="absolute w-full min-h-full sm:h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative px-4 sm:px-0 w-full h-full flex justify-center items-center z-99">
        <div className="pt-4 w-full sm:w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="w-[160px] pb-3 sm:pb-4 sm:w-[300px]">
            <Link to="/">
              <img className="w-206px h-104px" src={logo} alt="image 1" />
            </Link>
          </div>
          <div className="bg-third w-full  h-fit p-6 sm:p-10 flex flex-col gap-4 justify-center items-center pb-8">
            <div className=" flex flex-col justify-between items-center gap-4">
              <span className="font-normal text-[18px] text-gray-600 text-justify">
                Sign in with your data that you entered during your registration
              </span>
            </div>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col w-full items-center gap-5"
              autoComplete="off"
            >
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="email" className="w-full">
                  Email
                </label>
                <div className="border rounded border-gray-400">
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="outline-none py-3 px-4"
                    autoComplete="off"
                  />
                </div>
                <span className="text-red">{errors.email?.message}</span>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="password" className="w-full">
                  Password
                </label>
                <div className="border rounded border-gray-400 flex flex-row justify-between items-center px-5">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="outline-none py-3"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <LuEyeClosed className="text-xl" />
                    ) : (
                      <LuEye className="text-xl" />
                    )}
                  </button>
                </div>
                <span className="text-red">{errors.password?.message}</span>
              </div>
              <div className="flex flex-row justify-end w-full gap-3">
                <span className="text-primary">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </span>
              </div>
              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
                disabled={isSubmitting}
              >
                Login
              </button>
              <span>
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="text-primary">Register</span>
                </Link>
              </span>
              <div className="flex flex-row justify-between w-full gap-4 items-center text-gray-400">
                <hr className="border-1 w-full" />
                <span>Or</span>
                <hr className="border-1 w-full" />
              </div>
              <div className="flex flex-row items-center justify-center gap-6  w-full">
                <button className="flex flex-row justify-center items-center w-full gap-4 rounded text-primary p-2 bg-white shadow">
                  <BsGoogle />
                  Google
                </button>
                <button className="flex flex-row justify-center items-center w-full gap-4 rounded text-primary p-2 bg-white shadow">
                  <FaFacebook />
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
