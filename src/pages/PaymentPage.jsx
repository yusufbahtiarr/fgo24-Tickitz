import React, { useCallback, useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import http from "../utils/axios";
import { showNotif } from "../utils/notif";

function PaymentPage() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auths.token);
  const users =
    authToken && typeof authToken === "string" ? jwtDecode(authToken) : null;
  const tempTicket = useSelector((state) => state.tickets.tempTicket);
  const [profiles, setProfiles] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const getProfile = useCallback(async () => {
    const response = await http(authToken).get(`/user/profile`);
    return response.data.results;
  }, [authToken]);

  const getPaymentMethod = useCallback(async () => {
    const response = await http().get(`/movies/payment-methods`);
    return response.data.results;
  }, []);

  const schema = yup.object({
    fullname: yup.string().required("Nama wajib diisi"),
    email: yup.string().required("Email wajib diisi"),
    phone: yup.string().required("Nomor telepon wajib diisi"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: profiles?.email || "",
      fullname: profiles?.fullname || "",
      phone: profiles?.phone || "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const profileData = await getProfile();
        const paymentMethodsRes = await getPaymentMethod();
        setProfiles(profileData);
        setPaymentMethods(paymentMethodsRes);
        reset({
          email: profileData?.email || "",
          fullname: profileData?.fullname || "",
          phone: profileData?.phone || "",
        });
      } catch (err) {
        throw err;
      }
    };

    fetchProfile();
  }, [reset, getProfile, getPaymentMethod]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modal, setModal] = useState(false);

  const onSubmit = async (dataSubmit) => {
    const newData = {
      payment: dataSubmit.payment,
    };

    try {
      const { data } = await http(authToken).post("/transactions", {
        email: dataSubmit.email,
        name: dataSubmit.fullname,
        phone: dataSubmit.phone,
        id_cinema: Number(tempTicket.idCinema),
        id_location: Number(tempTicket.idLocation),
        id_movie: Number(tempTicket.idMovie),
        id_payment_method: Number(dataSubmit.payment),
        id_time: Number(tempTicket.idTime),
        movie_date: tempTicket.date,
        seats: tempTicket.seats,
        total_payment: Number(tempTicket.totalPayment),
      });
      setTransactionId(data.results.id);
      // if (data.success) {
      //   showNotif("success", data.message);
      // } else {
      //   showNotif("error", data.message || "Transaction failed!");
      // }
    } catch (error) {
      // console.error(error);
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
    dispatch(addTempTicketAction(newData));

    setModal(true);
  };

  if (!users || users.userId == null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-fit bg-gray2 *:box-border *:*:box-border sm:overflow-x-hidden relative">
      <Navbar />
      <div className="h-fit w-full mt-21 sm:p-0 sm:px-43 ">
        <Stepper step2="bg-green2" step3="bg-primary" />
        <section className="sm:w-full h-full flex p-6  flex-col sm:flex-row gap-8 mb-12 sm:mb-20">
          <div className="w-full sm:min-w-[900px] py-10 px-10 rounded-2xl sm:rounded flex flex-col gap-10 mx-auto bg-white">
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
                <span className="font-normal">{tempTicket?.titleMovie}</span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  CINEMA NAME
                </span>
                <span className="font-normal capitalize">
                  {tempTicket?.cinema} Cinema
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  NUMBER OF TICKETS
                </span>
                <span className="font-normal">
                  {tempTicket?.seats?.length} pieces
                </span>
              </div>
              <div className="flex flex-col gap-4 border-b border-b-gray-200 pb-4">
                <span className="font-light text-sm text-gray-600 ">
                  TOTAL PAYMENT
                </span>
                <span className="font-bold text-blue">
                  Rp. {tempTicket?.totalPayment?.toLocaleString("id-ID")}
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
                      {...register("fullname")}
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="w-full py-3 px-6 outline-none"
                    />
                  </div>
                  <span className="text-red">{errors.fullname?.message}</span>
                </div>
                <div className="text-gray3 w-full flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <div className="text-gray3 border border-gray1 w-full">
                    <input
                      {...register("email")}
                      type="text"
                      name="email"
                      id="email"
                      className="w-full py-3 px-6 outline-none"
                    />
                  </div>
                  <span className="text-red">{errors.email?.message}</span>
                </div>
                <div className="text-gray3 w-full flex flex-col gap-2">
                  <label htmlFor="phone">Phone</label>
                  <div className="text-gray3 border border-gray1 w-full">
                    <input
                      {...register("phone")}
                      type="text"
                      name="phone"
                      id="phone"
                      className="w-full py-3 px-6 outline-none"
                    />
                  </div>
                  <span className="text-red">{errors.phone?.message}</span>
                </div>
                <div className="font-bold text-2xl mt-6">Payment Method</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-6 mb-6">
                  {paymentMethods?.map((method) => (
                    <label
                      key={method.id}
                      htmlFor={`payment-${method.id}`}
                      className={`shadow h-[60px] border border-gray-200 flex justify-center items-center cursor-pointer rounded-lg flex-1 text-center my-auto transition-all ${
                        selectedPayment === method.payment_method
                          ? "bg-primary/40"
                          : "bg-white"
                      }`}
                    >
                      <img
                        src={method.image_url}
                        alt={method.payment_method}
                        className="h-8 object-contain px-2"
                      />

                      <input
                        {...register("payment", {
                          required: "Pilih metode pembayaran",
                        })}
                        type="radio"
                        name="payment"
                        value={method.id}
                        id={`payment-${method.id}`}
                        className="sr-only"
                        onChange={() =>
                          setSelectedPayment(method.payment_method)
                        }
                      />
                    </label>
                  ))}
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
        totalPayment={tempTicket?.totalPayment?.toLocaleString("id-ID")}
        modal={modal}
        setModal={setModal}
        transactionId={transactionId}
      />
      <Footer />
    </div>
  );
}

export default PaymentPage;
