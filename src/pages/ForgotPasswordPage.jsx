import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/images/logowhite.png";
import { useState } from "react";
import { showNotif } from "../utils/notif";
import http from "../utils/axios";

function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Format Tidak Valid")
      .required("Email wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataReset) => {
    setIsSubmitting(true);

    try {
      await http().post("auth/forgot-password", {
        email: dataReset.email,
      });

      showNotif("success", "Silahkan cek di inbox email anda.");
      reset();
      // setTimeout(() => {
      //   setIsSubmitting(false);
      // }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        if (status === 400) {
          showNotif("error", `Bad Request: ${message}`);
        } else if (status === 404) {
          showNotif("error", `Email tidak terdaftar.`);
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
      <div className="absolute w-full h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative px-4 sm:px-0 w-full h-full flex justify-center items-center z-99">
        <div className="pt-2 w-full sm:w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="w-[160px] pb-3 sm:py-4 sm:w-[300px]">
            <Link to="/">
              <img className="w-206px h-104px" src={logo} alt="image 1" />
            </Link>
          </div>
          <div className="bg-white w-full rounded h-fit border border-orange-200 p-6 sm:p-10 flex flex-col gap-4 justify-center items-center pb-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full items-center gap-5 "
              autoComplete="off"
            >
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="email" className="w-full">
                  Email
                </label>
                <div className="border rounded">
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
              <div className="flex flex-row gap-2">
                <span>Remember your password?</span>
                <span>
                  <Link to="/login">
                    <span className="text-primary">Log in</span>
                  </Link>
                </span>
              </div>
              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
                disabled={isSubmitting}
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
