import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="w-screen h-screen bg-[url(./src/assets/images/background.png)]  object-cover bg-no-repeat bg-center">
      <div className="w-full h-full flex justify-center items-center">
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
            <form className="flex flex-col w-full items-center gap-5">
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="email" className="w-full">
                  Email
                </label>
                <div className="border rounded border-gray-400">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="outline-none py-3 px-4"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <label htmlFor="password" className="w-full">
                  Password
                </label>
                <div className="border rounded border-gray-400">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="outline-none py-3 px-4"
                  />
                </div>
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
