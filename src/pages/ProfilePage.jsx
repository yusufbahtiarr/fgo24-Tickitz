import Navbar from "../components/Navbar";
import { HiDotsHorizontal } from "react-icons/hi";
import Button from "./../components/Button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import profile from "../assets/images/profile.png";
import { showNotif } from "../utils/notif";
import { jwtDecode } from "jwt-decode";
import http from "../utils/axios";

function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profiles, setProfiles] = useState(null);
  const authToken = useSelector((state) => state.auths.token);
  const users =
    authToken && typeof authToken === "string" ? jwtDecode(authToken) : null;

  const schema = yup.object({
    fullname: yup.string().required("Nama wajib diisi"),
    email: yup.string().required("Email wajib diisi"),
    phone: yup.string().required("Nomor telepon wajib diisi"),
  });
  // const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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
    if (!users || !users.userId) return;

    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const profileData = await getProfile();
        setProfiles(profileData);
      } catch (err) {
        throw err;
      }
    };

    fetchProfile();
  }, [users, authToken]);

  useEffect(() => {
    if (profiles) {
      setValue("fullname", profiles.fullname || "");
      setValue("email", profiles.email || "");
      setValue("phone", profiles.phone || "");
    }
  }, [profiles, setValue]);

  const handleProfile = async (data) => {
    setIsSubmitting(true);
    try {
      if (data.newPassword !== data.confirmPassword) {
        showNotif(
          "error",
          "Password baru tidak sama dengan password konfirmasi."
        );
        resetField("newPassword");
        resetField("confirmPassword");
        setTimeout(() => {
          setIsSubmitting(false);
        }, 4000);
        return;
      }
      if (
        data.fullname === profiles.fullname &&
        data.email === profiles.email &&
        data.phone === profiles.phone &&
        !data.newPassword &&
        !data.confirmPassword
      ) {
        showNotif("info", "Data tidak ada yang diperbaharui.");
        setTimeout(() => {
          setIsSubmitting(false);
        }, 4000);
        return;
      }

      const updateData = {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
      };
      if (data.newPassword) {
        updateData.new_password = data.newPassword;
        updateData.confirm_password = data.confirmPassword;
      }

      await http(authToken).patch("/user/profile", updateData);

      showNotif("success", "Data berhasil diperbaharui.");

      reset();

      const updateProfile = await getProfile();
      setProfiles(updateProfile);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 4000);
    } catch (error) {
      showNotif(
        "error",
        error.response?.data?.message || "Gagal memperbarui profil"
      );
      console.error("Error updating profile:", error);
    }
  };

  if (!users || users.role == null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <div className="flex sm:hidden flex-row bg-white items-center justify-evenly text-[18px] mt-21">
        <span className="font-normal border-b-2 border-primary py-6">
          Account Settings
        </span>
        <span className="text-seventh">
          <Link to="/order-history">Order History</Link>
        </span>
      </div>
      <div className="sm:mt-4 h-full w-full bg-gray2 sm:p-18 sm:pb-10 p-6">
        <div className="sm:p-10 flex flex-col sm:flex-row gap-8 ">
          <div className="w-full sm:w-[30%] h-200 rounded-4xl bg-white flex flex-col">
            <div className="flex-1 flex flex-col p-10 gap-4 justify-between items-center">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-light text-gray-700">INFO</span>
                <button>
                  <HiDotsHorizontal className="size-8 text-primary" />
                </button>
              </div>
              <div className="flex justify-center items-center mb-6">
                <img
                  src={profile}
                  alt="profile"
                  className="size-[136px] object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-secondary text-[20px] ffont-semibold">
                  {profiles?.fullname
                    ? profiles?.fullname
                    : profiles?.email.split("@")[0]}
                </span>
              </div>
              <div>
                <span>Moviegoers</span>
              </div>
            </div>
            <hr className="border-2 border-gray-200" />
            <div className="flex-1 flex flex-col p-10 gap-6">
              <div>
                <span className="font-semibold">Loyalty Points</span>
              </div>
              <div className="bg-primary rounded-3xl h-44 flex flex-col text-white p-8 justify-between items-start overflow-hidden relative">
                <div>
                  <span className="text-[18px] font-bold">Moviegoers</span>
                </div>
                <div className="flex flex-row items-end gap-2 relative overflow-hidden">
                  <span className="text-[24px] font-semibold leading-7">
                    320
                  </span>
                  <span className="text-[12px]">points</span>
                </div>
                <div className="absolute -top-14 -right-7 size-35 rounded-full bg-white opacity-40"></div>
                <div className="absolute -top-4 -right-14 size-35 rounded-full bg-white opacity-40"></div>
                <div className="absolute top-0 right-0 rotate-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 h-20"
                    viewBox="0 0 24 24"
                    fill="url(#starGradient)"
                  >
                    <defs>
                      <linearGradient
                        id="starGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#facc15" />
                      </linearGradient>
                    </defs>
                    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center w-full">
                <div className="w-full text-center">
                  <span>180 points become a master</span>
                </div>
                <div className="w-full bg-gray2 rounded-full h-5">
                  <div className="w-[50%] bg-primary rounded-full h-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-[70%] h-fit rounded-4xl flex flex-col gap-8 mb-8 sm:mb-0">
            <form
              onSubmit={handleSubmit(handleProfile)}
              className=" flex flex-col gap-8 sm:gap-10"
              autoComplete="off"
            >
              <div className="hidden sm:flex flex-row gap-10 bg-white rounded-3xl px-15 items-center text-[18px]">
                <span className="font-normal border-b-2 border-primary py-6">
                  Account Settings
                </span>
                <span className="text-seventh">
                  <Link to="/order-history">Order History</Link>
                </span>
              </div>
              <div className="bg-white rounded-3xl flex flex-col px-8 py-10 gap-4">
                <div>
                  <span className="font-normal">Details Information</span>
                </div>
                <hr className="border-1 border-gray2 mb-4" />
                <div className="flex flex-col sm:flex-row gap-9 sm:mb-4">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="fullname" className="text-seventh">
                      Full Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        {...register("fullname")}
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="input your fullname"
                        className="outline-0 w-[85%]"
                        defaultValue={profiles?.fullname}
                      />
                    </div>
                    <span className="text-red">{errors.fullname?.message}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-9 sm:mb-4">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="email" className="text-seventh">
                      E-mail
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="input your email"
                        className="outline-0 w-[85%]  "
                        defaultValue={profiles?.email}
                      />
                    </div>
                    <span className="text-red">{errors.email?.message}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-9 sm:mb-4">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="Phone Number" className="text-seventh">
                      Phone Number
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        {...register("phone")}
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="input your phone"
                        className="outline-0 w-[85%]  "
                        defaultValue={profiles?.phone}
                      />
                    </div>
                    <span className="text-red">{errors.phone?.message}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl flex flex-col px-8 py-10 gap-4">
                <div>
                  <span className="font-normal">Account and Privacy</span>
                </div>
                <hr className="border-1 border-gray2 mb-4" />
                <div className="flex flex-col sm:flex-row gap-9">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="newPassword" className="text-seventh">
                      New Password
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center justify-between">
                      <input
                        {...register("newPassword")}
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Write your password"
                        className="outline-0 w-[85%] "
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="cursor-pointer"
                        tabIndex={-1}
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
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="confirmPassword" className="text-seventh">
                      Confirm Password
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center justify-between">
                      <input
                        {...register("confirmPassword")}
                        type={showPasswordConfirm ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        className="outline-0 w-[85%]"
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className="cursor-pointer"
                        tabIndex={-1}
                        onClick={() => {
                          setShowPasswordConfirm(!showPasswordConfirm);
                        }}
                      >
                        {showPasswordConfirm ? (
                          <LuEyeClosed className="text-xl" />
                        ) : (
                          <LuEye className="text-xl" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Button
                  variant="third"
                  className="text-white w-full sm:w-[30%] capitalize rounded-2xl"
                  disabled={isSubmitting}
                >
                  Update changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
