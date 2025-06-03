import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { id as LocaleID } from "date-fns/locale";
import { format } from "date-fns";
import profile from "../assets/images/profile.png";

function OrderHistoryPage() {
  const users = useSelector((state) => state.auths.currentUser);
  const dataTickets = useSelector((state) => state.tickets.data);
  console.log("data ticket: ", dataTickets);
  console.log("data user", users);

  const dataMovie = dataTickets.filter((item) => item.idUser === users.id);
  console.log("data movie", dataMovie);
  const navigate = useNavigate();
  useEffect(() => {
    if (users === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex sm:hidden flex-row bg-white items-center justify-evenly text-[18px] mt-21 overflow-y-hidden">
        <span className="text-fourth ">
          <Link to="/profile">Account Settings</Link>
        </span>
        <span className="font-normal border-b-2 border-primary py-6">
          Order History
        </span>
      </div>
      <div className="sm:mt-4 bg-gray2 min-h-[98vh] h-fit sm:p-18 sm:pb-10">
        <div className="p-6 sm:p-10 flex flex-row gap-8 sm:mb-8 h-full">
          <div className="w-[30%] h-200 rounded-4xl bg-white hidden sm:flex flex-col">
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
          <div className="sm:w-[70%] sm:min-h-180 mb-10 sm:mb-0 rounded-4xl flex flex-col gap-8 sm:gap-10 w-full">
            <div className="hidden sm:flex flex-row gap-10 bg-white rounded-3xl px-15 items-center text-[18px]">
              <span className="text-fourth ">
                <Link to="/profile">Account Settings</Link>
              </span>
              <span className="font-normal border-b-2 border-primary py-6">
                Order History
              </span>
            </div>
            {dataMovie
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item) => {
                return (
                  <div className="bg-white rounded-3xl flex flex-col gap-4">
                    <div
                      key={`list-movie-${item.idTicket}`}
                      className="flex flex-col  sm:flex-row justify-between p-6 sm:px-12 sm:py-10 "
                    >
                      <div className="flex flex-col justify-between gap-2">
                        {/* <span>{item.idTicket}</span> */}
                        <span className="font-normal text-sm text-fourth">
                          {format(new Date(item.date), "EEEE, dd MMMM yyyy", {
                            locale: LocaleID,
                          })}{" "}
                          - {item.time}
                        </span>
                        <span className="text-xl sm:text-2xl font-semibold">
                          {item.titleMovie}
                        </span>
                        <span>
                          Seats :{" "}
                          <span className="font-semibold">
                            {item.seats?.join(", ")}
                          </span>
                        </span>
                      </div>
                      <div className="flex flex-col items-start  justify-between capitalize w-45">
                        <div>
                          Cinema :{" "}
                          <span className="font-semibold">{item.cinema}</span>
                        </div>
                        <div>
                          Location :{" "}
                          <span className="font-semibold">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <hr className="border-1 border-gray2 mb-4" />
              {/* <div className="flex flex-row justify-between items-center px-12 pb-10">
                <div className="flex flex-1 flex-row gap-10">
                  <div className="ticket-active">Ticket in active</div>
                  <div className="not-paid">Not Paid</div>
                </div>
                <div className="flex flex-1 flex-row justify-end gap-3">
                  <select
                    name="details"
                    id="detail"
                    className="text-fourth text-[18px] p-3"
                  >
                    <option value="">Show Details </option>
                  </select>
                </div>
              </div> */}
            {/* <div className="px-12 pb-10 flex flex-col gap-4">
                  <div>
                    <span className="ticket-info">Ticket Information</span>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex-1 flex flx-row justify-between items-center">
                      <div className="w-[32%] flex justify-between items-center text-gray3">
                        <div>No. Rekening Virtual</div>
                        <div>:</div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-row justify-end items-center gap-8">
                      <div>
                        <span className="text-[18px] font-bold">
                          12321328913829724
                        </span>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          className="font-normal text-sm"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex-1 flex flx-row justify-between items-center">
                      <div className="w-[32%] flex justify-between items-center  text-gray3">
                        <div>Total Payment</div>
                        <div>:</div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-row justify-end items-center">
                      <div>
                        <span className="text-[18px] font-bold text-blue">
                          $30
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full">
                    <span className=" text-gray3">
                      Pay this payment bill before it is due,
                      <span className="text-red">on June 23, 2023</span>. If the
                      bill has not been paid by the specified time, it will be
                      forfeited
                    </span>
                  </div>

                  <div className="w-full flex gap-4 flex-col">
                    <Button
                      variant="third"
                      className="font-bold text-white w-fit px-12 capitalize"
                    >
                      Cek Pembayaran
                    </Button>
                  </div>
                </div> */}

            {/* <div className="bg-white rounded-3xl flex flex-col gap-4">
              <div className="flex flex-row justify-between px-12 py-10 ">
                <div className="flex flex-col justify-between gap-2">
                  <span className="font-normal text-sm text-fourth">
                    Monday, 14 June 2020 - 02:00pm
                  </span>
                  <span className="text-2xl font-semibold">
                    Avengers: End Game
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    src="./src/assets/images/ebv-black.png"
                    alt="CineOne21"
                  />
                </div>
              </div>
              <hr className="border-1 border-gray2 mb-4" />
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center px-12 pb-10">
                  <div className="flex flex-1 flex-row gap-10">
                    <div className="ticket-used">Ticket used</div>
                    <div className="paid">Paid</div>
                  </div>
                  <div className="flex flex-1 flex-row justify-end gap-3">
                    <select
                      name="details"
                      id="detail"
                      className="text-fourth text-[18px] p-3"
                    >
                      <option value="">Show Details </option>
                    </select>
                  </div>
                </div>
                <div className="px-12 pb-10">
                  <div>
                    <span className="ticket-info">Ticket Information</span>
                  </div>
                  <div className="flex flex-row items-center gap-15">
                    <div>
                      <img
                        src="./src/assets/images/qr.png"
                        alt="qr"
                        className="size-[174px]"
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-row gap-8">
                        <div className="flex flex-col">
                          <span className="ticket-title">Category</span>
                          <span className="ticket-desc">PG-13</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ticket-title">Time</span>
                          <span className="ticket-desc">2:00pm</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ticket-title">Seats</span>
                          <span className="ticket-desc">C4, C5, C6</span>
                        </div>
                      </div>
                      <div className="flex flex-row gap-8">
                        <div className="flex flex-col">
                          <span className="ticket-title">Movie</span>
                          <span className="ticket-desc">Spider-Man: ..</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ticket-title">Date</span>
                          <span className="ticket-desc">07 Jul</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="ticket-title">Count</span>
                          <span className="ticket-desc">3 pcs</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      <span className="font-normal">Total</span>
                      <span className="text-2xl font-semibold">$30.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="bg-white rounded-3xl flex flex-col gap-4">
              <div className="flex flex-row justify-between px-12 py-10 ">
                <div className="flex flex-col justify-between gap-2">
                  <span className="font-normal text-sm text-fourth">
                    Monday, 14 June 2020 - 02:00pm
                  </span>
                  <span className="text-2xl font-semibold">
                    Avengers: End Game
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    src="./src/assets/images/ebv-black.png"
                    alt="CineOne21"
                  />
                </div>
              </div>
              <hr className="border-1 border-gray2 mb-4" />
              <div className="flex flex-row justify-between items-center px-12 pb-10">
                <div className="flex flex-1 flex-row gap-10">
                  <div className="ticket-used">Ticket used</div>
                  <div className="paid">Paid</div>
                </div>
                <div className="flex flex-1 flex-row justify-end gap-3">
                  <select
                    name="details"
                    id="detail"
                    className="text-fourth text-[18px] p-3"
                  >
                    <option value="">Show Details </option>
                    <option value="tes">11</option>
                  </select>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
