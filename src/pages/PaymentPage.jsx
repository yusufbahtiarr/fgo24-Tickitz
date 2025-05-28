import React from "react";
import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function ChairSelector() {
  const chairElements = Array.from({ length: 49 }, (_, i) => (
    <label key={i} htmlFor={`chair${i}`} className="p-2">
      <input
        type="checkbox"
        name="chair"
        id={`chair${i}`}
        className="size-[36px] p-2 mt-2"
      />
    </label>
  ));

  return <div>{chairElements}</div>;
}

function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-fit bg-gray2 *:box-border *:*:box-border overflow-x-hidden">
      <Navbar />
      <div className="h-fit w-full mt-21 px-43">
        <Stepper step2="bg-green2" step3="bg-primary" />
        <section className="w-full h-full flex flex-row gap-8 mb-20">
          <div className="min-w-[900px] py-10 px-10 flex flex-col gap-10 mx-auto bg-white">
            <div className="flex flex-col gap-6">
              <div className="font-bold text-2xl mb-4">Payment Info</div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  DATE & TIME
                </span>
                <span className="font-normal">
                  Tuesday, 07 July 2020 at 02:00pm
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  MOVIE TITLE
                </span>
                <span className="font-normal">Spider-Man: Homecoming</span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  CINEMA NAME
                </span>
                <span className="font-normal">CineOne21 Cinema</span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  NUMBER OF TICKETS
                </span>
                <span className="font-normal">3 pieces</span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  TOTAL PAYMENT
                </span>
                <span className="font-bold text-blue">$30,00</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {/* <form className="flex flex-col gap-4" method="POST" > */}
              <div className="font-bold text-2xl ">Personal Information</div>
              <div className="text-gray3 w-full flex flex-col gap-2">
                <label htmlFor="fullname">Full Name</label>
                <div className="text-gray3 border border-gray1 w-full">
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="w-full py-3 px-6 outline-none"
                    placeholder="Jonas El Rodriguez"
                  />
                </div>
              </div>
              <div className="text-gray3 w-full flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <div className="text-gray3 border border-gray1 w-full">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-full py-3 px-6 outline-none"
                    placeholder="jonasrodri123@gmail.com"
                  />
                </div>
              </div>
              <div className="text-gray3 w-full flex flex-col gap-2">
                <label htmlFor="phone">Phone</label>
                <div className="text-gray3 border border-gray1 w-full">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="w-full py-3 px-6 outline-none"
                    placeholder="+6281445687121"
                  />
                </div>
              </div>
              <div className="font-bold text-2xl mt-6">Payment Method</div>
              <div className="grid grid-cols-4 w-full gap-6 mb-6">
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/gpay.png" alt="gpay" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/visa.png" alt="visa" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/gopay.png" alt="gopay" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/paypal.png" alt="paypal" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/dana.png" alt="dana" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/bca.png" alt="bca" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/bri.png" alt="bri" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
                <label
                  htmlFor="gpay"
                  className="shadow h-[56px] w-[146px] p-6 border border-gray-200 flex justify-center items-center"
                >
                  <img src="/src/assets/images/ovo.png" alt="ovo" />
                  <input
                    type="radio"
                    name="payment"
                    id="gpay"
                    hidden
                    className="absolute top-20 left-1/2"
                  />
                </label>
              </div>

              <div>
                <Button
                  variant="third"
                  className="text-white w-full"
                  onClick={() =>
                    navigate("/ticket-result", { replace: true, search: "" })
                  }
                >
                  Pay your order
                </Button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
