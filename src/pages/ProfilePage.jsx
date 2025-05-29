import Navbar2 from "../components/Navbar2";
import { HiDotsHorizontal } from "react-icons/hi";
import Button from "./../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { editUserAction } from "../redux/reducers/users";
import { editUserAndSyncAuth } from "../redux/reducers/editUserAndSyncAuth";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function ProfilePage() {
  // const users = useSelector((state) => state.users.data);
  const users = useSelector((state) => state.auths.currentUser);
  const navigate = useNavigate();
  // console.log(users);
  const [isValidError, setIsValidError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, []);

  const schema = yup.object({
    firstName: yup.string().required("Nama depan wajib diisi"),
    lastName: yup.string().required("Nama belakang wajib diisi"),
    email: yup.string().required("Email wajib diisi"),
    phone: yup.string().required("Nomor telepon wajib diisi"),
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    if (data.newpassword !== data.confirmpassword) {
      console.log("password tidak sama");
      setIsValidError(true);
      return;
    }

    dispatch(editUserAndSyncAuth(data));
    resetField("newpassword");
    resetField("confirmpassword");

    setIsValidError(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar2 />
      <div className="mt-6 h-full w-full bg-gray2 p-18">
        <div className="p-10 flex flex-row gap-8">
          <div className="w-[30%] h-200 rounded-4xl bg-white flex flex-col">
            <div className="flex-1 flex flex-col p-10 gap-4 justify-between items-center">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="font-light text-gray-700">INFO</span>
                <button>
                  <HiDotsHorizontal className="size-8 text-primary" />
                </button>
              </div>
              <div className="flex justify-center items-center mb-6">
                <img
                  src="./src/assets/images/profile.png"
                  alt="profile"
                  className="size-[136px] object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-secondary text-[20px] ffont-semibold">
                  {users?.firstName
                    ? `${users?.firstName} ${users?.lastName}`
                    : users?.email.split("@")[0]}
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
          <div className="w-[70%] h-300 rounded-4xl flex flex-col gap-14">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-12"
              autoComplete="off"
            >
              <div className="flex flex-row gap-10 bg-white rounded-3xl px-15 items-center text-[18px]">
                <span className="font-normal border-b-2 border-primary py-6">
                  Account Settings
                </span>
                <span className="text-fourth">
                  <Link to="/order-history">Order History</Link>
                </span>
              </div>
              <div className="bg-white rounded-3xl flex flex-col px-8 py-10 gap-4">
                <div>
                  <span className="font-normal">Details Information</span>
                </div>
                <hr className="border-1 border-gray2 mb-4" />
                <div className="flex flex-row gap-9">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="firstName" className="text-fourth">
                      First Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        {...register("firstName")}
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="input your firstname"
                        className="outline-0 w-[85%]"
                        defaultValue={users?.firstName}
                      />
                    </div>
                    <span className="text-red">
                      {errors.firstName?.message}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="lastName" className="text-fourth">
                      Last Name
                    </label>
                    <div className="border border-gray2 rounded-2xl p-5 flex items-center">
                      <input
                        {...register("lastName")}
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="input your lastname"
                        className="outline-0 w-[85%]"
                        defaultValue={users?.lastName}
                      />
                    </div>
                    <span className="text-red">{errors.lastName?.message}</span>
                  </div>
                </div>
                <div className="flex flex-row gap-9 mb-4">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="email" className="text-fourth">
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
                        defaultValue={users?.email}
                      />
                    </div>
                    <span className="text-red">{errors.email?.message}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="Phone Number" className="text-fourth">
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
                        defaultValue={users?.phone}
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
                <div className="flex flex-row gap-9">
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="newPassword" className="text-fourth">
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
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label htmlFor="confirmPassword" className="text-fourth">
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
                      />
                      <button
                        type="button"
                        className="cursor-pointer"
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
                {isValidError && (
                  <span className="text-red">Password tidak sama</span>
                )}
                {isSuccess && (
                  <span className="text-green">Data berhasil diperbaharui</span>
                )}
              </div>
              <div className="w-full">
                <Button
                  variant="third"
                  className="text-white w-[30%] capitalize rounded-2xl"
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
