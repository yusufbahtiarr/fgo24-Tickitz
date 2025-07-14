import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import { isEmailExists } from "../utils/authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import logo from "../assets/images/logowhite.png";
import { showNotif } from "../utils/notif";
import http from "../utils/axios";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email("Format Tidak Valid")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(8, "Password minimal 8 karakter")
      .required("Password wajib diisi"),
    confirm_password: yup
      .string()
      .min(8, "Password minimal 8 karakter")
      .required("Confirm Password wajib diisi"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (register) => {
    setIsSubmitting(true);

    try {
      const { data } = await http().post("/auth/register", {
        email: register.email,
        password: register.password,
        confirm_password: register.confirm_password,
      });

      if (data.success) {
        console.log(data.message);
        showNotif("success", data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        showNotif("error", data.message || "Registration failed!");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        if (status === 400) {
          showNotif("error", `Bad Request: ${message}`);
        } else if (status === 409) {
          showNotif("error", `${message}`);
        } else if (status === 500) {
          showNotif("error", `Internal Server Error: ${message}`);
        } else {
          showNotif("error", `Error: ${message}`);
        }
      } else {
        showNotif("error", "No response from server. Please try again later.");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-[url(../src/assets/images/background.png)] object-cover bg-no-repeat bg-center relative">
      <div className="absolute w-full min-h-full sm:h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative px-4 sm:px-0 w-full h-full flex justify-center items-center z-99">
        <div className="pt-4 w-full sm:w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="w-[160px] pb-3 sm:py-4 sm:w-[300px]">
            <Link to="/">
              <img className="w-206px h-104px" src={logo} alt="image 1" />
            </Link>
          </div>
          <div className="bg-third w-full rounded h-fit border border-orange-200 p-6 sm:p-10 flex flex-col gap-4 justify-center items-center pb-8">
            {/* <div className="hidden sm:flex flex-row items-center gap-4 mb-10 w-full justify-between">
              <div className=" flex flex-col justify-between items-center gap-4">
                <div className="rounded-full size-12 bg-primary flex items-center justify-center font-medium text-white">
                  <span className="text-third">1</span>
                </div>
                <span>Fill Form</span>
              </div>
              <div className="border-dashed border-2 border-gray1 w-18"></div>
              <div className=" flex flex-col justify-between items-center gap-4">
                <div className="rounded-full size-12 bg-third flex items-center justify-center font-medium text-secondary">
                  <span className="text-secondary">2</span>
                </div>
                <span className="text-primary/50">Active</span>
              </div>
              <div className="border-dashed border-2 border-gray1 w-18"></div>
              <div className=" flex flex-col justify-center items-center gap-4">
                <div className="rounded-full size-12 bg-third flex items-center justify-center font-medium text-secondary">
                  <span className="text-secondary">3</span>
                </div>
                <span className="text-primary/50">Done</span>
              </div>
            </div> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full items-center gap-5 "
              autoComplete="off"
            >
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="email" className="w-full">
                  Email
                </label>
                <div className="border rounded border-gray3">
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="outline-none py-3 px-4 w-full"
                    autoComplete="off"
                  />
                </div>
                <span className="text-red">{errors.email?.message}</span>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="password" className="w-full">
                  Password
                </label>
                <div className="border rounded flex flex-row justify-between items-center px-5">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="outline-none py-3 w-[90%]"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="cursor-pointer "
                    tabIndex="-1"
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
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="confirm_password" className="w-full">
                  Confirm Password
                </label>
                <div className="border rounded flex flex-row justify-between items-center px-5">
                  <input
                    {...register("confirm_password")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter your confirm password"
                    className="outline-none py-3 w-[90%]"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="cursor-pointer "
                    tabIndex="-1"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? (
                      <LuEyeClosed className="text-xl" />
                    ) : (
                      <LuEye className="text-xl" />
                    )}
                  </button>
                </div>
                <span className="text-red">
                  {errors.confirm_password?.message}
                </span>
              </div>
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row gap-3">
                  <input
                    type="checkbox"
                    name="term"
                    id="term"
                    className="h-5 w-5"
                    required
                  />
                  <label htmlFor="term" className="">
                    I agree to terms & conditions
                  </label>
                </div>
                <span className="text-red">{errors.term?.message}</span>
              </div>
              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
                disabled={isSubmitting}
              >
                Join For Free Now
              </button>
              <div className="flex flex-row gap-2">
                <span>Already have an account? </span>
                <span>
                  <Link to="/login">
                    <span className="text-primary">Log in</span>
                  </Link>
                </span>
              </div>
              <div className="flex flex-row justify-between w-full gap-4 items-center">
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

export default RegisterPage;
