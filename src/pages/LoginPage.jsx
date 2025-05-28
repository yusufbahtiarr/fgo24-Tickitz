import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/reducers/auths";
import { comparePassword, isEmailExists } from "../utils/authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.data);
  const [loginError, setLoginError] = useState(false);

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

  const onSubmit = (data) => {
    const isExists = isEmailExists(users, data.email);
    if (!isExists) {
      setLoginError(true);
      return;
    }
    const found = users.filter((user) => user.email === data.email)[0];
    if (!comparePassword(found.password, data.password)) {
      setLoginError(true);
      return;
    }

    dispatch(loginUser(found));
    console.log(data);
    console.log(found);

    navigate("/profile");
  };

  setTimeout(() => {
    setLoginError(false);
  }, 4000);

  return (
    <div className="w-screen h-screen bg-[url(./src/assets/images/background.png)]  object-cover bg-no-repeat bg-center">
      <div className="absolute w-full h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="pt-4 w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="bg-white w-full  h-fit p-10 flex flex-col gap-4 justify-center items-center pb-8">
            <div className="flex flex-row items-center gap-6 w-full">
              <div className=" flex flex-col justify-between items-center gap-4">
                <span className="font-bold text-[32px]">Welcome Back👋</span>
              </div>
            </div>
            <div className=" flex flex-col justify-between items-center gap-4">
              <span className="font-normal text-[18px] text-gray-600 text-justify">
                Sign in with your data that you entered during your registration
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                  />
                </div>
                <span className="text-red">{errors.email?.message}</span>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="password" className="w-full">
                  Password
                </label>
                <div className="border rounded border-gray-400">
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="outline-none py-3 px-4"
                  />
                </div>
                <span className="text-red">{errors.password?.message}</span>
              </div>
              <div className="flex flex-row justify-end w-full gap-3">
                <span className="text-primary">Forgot your password?</span>
              </div>
              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
              >
                Login
              </button>
              <span className="text-red">
                {loginError && (
                  <span className="text-red">Email atau Password salah!</span>
                )}
              </span>
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
