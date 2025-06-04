import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmailExists } from "../utils/authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo2 from "../assets/images/tickitz2.png";
import { toast } from "react-toastify";
import { useState } from "react";

function ForgotPasswordPage() {
  const users = useSelector((state) => state.users.data);
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const showSuccessNotif = () => {
    toast.success("Silahkan cek inbox di email anda", {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const showErrorNotif = () => {
    toast.error("Email tidak terdaftar", {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const isExists = isEmailExists(users, data.email);

    if (isExists) {
      showSuccessNotif();
    } else {
      showErrorNotif();
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 4000);
  };

  return (
    <div className="w-screen h-screen bg-[url(../src/assets/images/background.png)] object-cover bg-no-repeat bg-center relative">
      <div className="absolute w-full h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative px-4 sm:px-0 w-full h-full flex justify-center items-center z-99">
        <div className="pt-2 w-full sm:w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="w-[160px] py-2 sm:py-0 sm:w-[300px]">
            <img className="w-206px h-104px" src={logo2} alt="image 1" />
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
