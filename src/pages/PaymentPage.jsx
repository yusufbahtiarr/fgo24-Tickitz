import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useForm } from "react-hook-form";
import ModalPayment from "../components/ModalPayment";
import { addTempTicketAction } from "../redux/reducers/tickets";
import { useNavigate } from "react-router-dom";
import gpay from "../../src/assets/images/gpay.png";
import visa from "../../src/assets/images/visa.png";
import gopay from "../../src/assets/images/gopay.png";
import paypal from "../../src/assets/images/paypal.png";
import dana from "../../src/assets/images/dana.png";
import bca from "../../src/assets/images/bca.png";
import bri from "../../src/assets/images/bri.png";
import ovo from "../../src/assets/images/ovo.png";

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auths.currentUser);
  const tempTicket = useSelector((state) => state.tickets.tempTicket);
  // console.log(tempTicket);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { register, handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, [users]);
  if (users === null) {
    return null;
  }

  function onSubmit(data) {
    const newData = {
      payment: data.payment,
    };

    dispatch(addTempTicketAction(newData));
    setModal(true);
  }

  return (
    <div className="w-screen h-fit bg-gray2 *:box-border *:*:box-border overflow-x-hidden relative">
      <Navbar />
      <div className="h-fit w-full mt-21 px-43 ">
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
                  {tempTicket?.date &&
                    format(tempTicket?.date, "EEEE, dd MMMM yyyy", {
                      locale: id,
                    })}{" "}
                  - {tempTicket?.time}
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  MOVIE TITLE
                </span>
                <span className="font-normal">{tempTicket.titleMovie}</span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  CINEMA NAME
                </span>
                <span className="font-normal capitalize">
                  {tempTicket.cinema} Cinema
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  NUMBER OF TICKETS
                </span>
                <span className="font-normal">
                  {tempTicket.seats.length} pieces
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  TOTAL PAYMENT
                </span>
                <span className="font-bold text-blue">
                  Rp. {tempTicket.totalPayment.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="font-bold text-2xl ">Personal Information</div>
                <div className="text-gray3 w-full flex flex-col gap-2">
                  <label htmlFor="fullname">Full Name</label>
                  <div className="text-gray3 border border-gray1 w-full">
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="w-full py-3 px-6 outline-none"
                      value={
                        users?.firstName && users?.lastName
                          ? `${users.firstName} ${users.lastName}`
                          : ""
                      }
                      disabled
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
                      value={users.email}
                      disabled
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
                      value={users?.phone ? users?.phone : ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="font-bold text-2xl mt-6">Payment Method</div>
                <div className="grid grid-cols-4 w-full gap-6 mb-6">
                  <label
                    htmlFor="gpay"
                    className={`shadow h-[60px]  border-gray-200 flex justify-center items-center cursor-pointer border rounded-lg flex-1  text-center my-auto transition-all"
                    ${
                      selectedPayment === "gpay" ? "bg-primary/40" : "bg-white"
                    }`}
                  >
                    <img src={gpay} alt="gpay" className="w-15" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="gpay"
                      id="gpay"
                      className="sr-only"
                      onChange={() => setSelectedPayment("gpay")}
                    />
                  </label>
                  <label
                    htmlFor="visa"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "visa" ? "bg-primary/40" : "bg-white"
                     }`}
                  >
                    <img src={visa} alt="visa" className="w-15" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="visa"
                      id="visa"
                      className="sr-only"
                      onChange={() => setSelectedPayment("visa")}
                    />
                  </label>
                  <label
                    htmlFor="gopay"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "gopay"
                         ? "bg-primary/40"
                         : "bg-white"
                     }`}
                  >
                    <img src={gopay} alt="gopay" className="w-15" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="gopay"
                      id="gopay"
                      className="sr-only"
                      onChange={() => setSelectedPayment("gopay")}
                    />
                  </label>
                  <label
                    htmlFor="paypal"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "paypal"
                         ? "bg-primary/40"
                         : "bg-white"
                     }`}
                  >
                    <img src={paypal} alt="paypal" className="h-8" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="paypal"
                      id="paypal"
                      className="sr-only"
                      onChange={() => setSelectedPayment("paypal")}
                    />
                  </label>
                  <label
                    htmlFor="dana"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "dana" ? "bg-primary/40" : "bg-white"
                     }`}
                  >
                    <img src={dana} alt="dana" className="w-18" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="dana"
                      id="dana"
                      className="sr-only"
                      onChange={() => setSelectedPayment("dana")}
                    />
                  </label>
                  <label
                    htmlFor="bca"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "bca" ? "bg-primary/40" : "bg-white"
                     }`}
                  >
                    <img src={bca} alt="bca" className="w-15" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="bca"
                      id="bca"
                      className="sr-only"
                      onChange={() => setSelectedPayment("bca")}
                    />
                  </label>
                  <label
                    htmlFor="bri"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "bri" ? "bg-primary/40" : "bg-white"
                     }`}
                  >
                    <img src={bri} alt="bri" className="h-8" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="bri"
                      id="bri"
                      className="sr-only"
                      onChange={() => setSelectedPayment("bri")}
                    />
                  </label>
                  <label
                    htmlFor="ovo"
                    className={`shadow h-[60px] p-6 border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1  text-center my-auto transition-all
                     ${
                       selectedPayment === "ovo" ? "bg-primary/40" : "bg-white"
                     }`}
                  >
                    <img src={ovo} alt="ovo" className="w-15" />
                    <input
                      {...register("payment", { required: true })}
                      type="radio"
                      name="payment"
                      value="ovo"
                      id="ovo"
                      className="sr-only"
                      onChange={() => setSelectedPayment("ovo")}
                    />
                  </label>
                </div>

                <div>
                  <Button variant="third" className="text-white w-full">
                    Pay your order
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <ModalPayment
        totalPayment={tempTicket.totalPayment.toLocaleString("id-ID")}
        modal={modal}
        setModal={setModal}
      />
      <Footer />
    </div>
  );
}

export default PaymentPage;
