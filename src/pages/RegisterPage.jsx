import { useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/reducers/users";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.data);
  console.log(users);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log("Form data:", data); // Handle form data (e.g., dispatch to Redux)
    const encodedPassword = btoa(data.password);
    dispatch(addUser({ email: data.email, password: encodedPassword }));
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-[url(./src/assets/images/background.png)] object-cover bg-no-repeat bg-center relative">
      <div className="absolute w-full h-full top-0 left-0 right-0 bg-black/60 z-0"></div>
      <div className="relative w-full h-full flex justify-center items-center z-99">
        <div className="pt-2 w-[546px] h-fit bg-primary pb-4 flex flex-col bg-opacity-10 justify-center items-center rounded-2xl">
          <div className="w-[300px]">
            <img
              className="w-206px h-104px"
              src="./src/assets/images/tickitz2.png"
              alt="image 1"
            />
          </div>
          <div className="bg-white w-full rounded h-fit border border-orange-200 p-10 flex flex-col gap-4 justify-center items-center pb-8">
            <div className="flex flex-row items-center gap-4 mb-10 w-full justify-between">
              <div className=" flex flex-col justify-between items-center gap-4">
                <div className="rounded-full size-12 bg-primary flex items-center justify-center font-medium text-white">
                  <span className="text-third">1</span>
                </div>
                <span>Fill Form</span>
              </div>
              <img
                src="../src/assets/images/line-through.png"
                className="h-[2px] w-20"
                alt="line"
              />
              <div className=" flex flex-col justify-between items-center gap-4">
                <div className="rounded-full size-12 bg-third flex items-center justify-center font-medium text-secondary">
                  <span className="text-secondary">2</span>
                </div>
                <span className="text-third">Active</span>
              </div>
              <img
                src="../src/assets/images/line-through.png"
                className="h-[2px] w-20"
                alt="line"
              />
              <div className=" flex flex-col justify-center items-center gap-4">
                <div className="rounded-full size-12 bg-third flex items-center justify-center font-medium text-secondary">
                  <span className="text-secondary">3</span>
                </div>
                <span className="text-third">Done</span>
              </div>
            </div>
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
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="password" className="w-full">
                  Password
                </label>
                <div className="border rounded">
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="outline-none py-3 px-4"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row w-full gap-3">
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
              <button
                type="Submit"
                className="flex flex-row justify-center items-center w-full gap-4 rounded bg-primary p-3 text-white"
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
