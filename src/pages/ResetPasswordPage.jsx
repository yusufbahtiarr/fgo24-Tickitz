import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/images/logowhite.png";
import { useEffect, useState } from "react";
import { showNotif } from "../utils/notif";
import http from "../utils/axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";
import NotFound from "./NotFound";

function ResetPasswordPage() {
  const { token } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [isValidToken, setIsValidToken] = useState(null);

  const schema = yup.object({
    newPassword: yup
      .string()
      .min(8, "Password minimal 8 karakter")
      .required("Password wajib diisi"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Konfirmasi password tidak cocok")
      .required("Konfirmasi password wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        setIsValidToken(false);
      } else {
        setIsValidToken(true);
      }
    } catch {
      setIsValidToken(false);
    }
  }, [token]);

  if (!isValidToken) {
    return <NotFound />;
  }

  const handleReset = async (data) => {
    setIsSubmitting(true);

    try {
      await http().post(`auth/reset-password/${token}`, {
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });

      showNotif("success", "Reset Password berhasil.");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        if (status === 400) {
          showNotif("error", `Input password tidak Valid`);
        } else if (status === 500) {
          showNotif("error", `Kesalahan server internal.`);
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
              onSubmit={handleSubmit(handleReset)}
              className="flex flex-col w-full items-center gap-5 "
              autoComplete="off"
            >
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="newPassword" className="w-full">
                  New Password
                </label>
                <div className="border rounded border-gray3 flex flex-row justify-between items-center pr-3">
                  <input
                    {...register("newPassword")}
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter your new password"
                    className="outline-none py-3 px-4 w-full"
                    autoComplete="off"
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
                <span className="text-red">{errors.newPassword?.message}</span>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="confirmPassword" className="w-full">
                  Confirm Password
                </label>
                <div className="border rounded border-gray3 flex flex-row justify-between items-center pr-3">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Enter your confirm password"
                    className="outline-none py-3 px-4 w-full"
                    autoComplete="off"
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
                  {errors.confirmPassword?.message}
                </span>
              </div>

              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
                disabled={isSubmitting}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
