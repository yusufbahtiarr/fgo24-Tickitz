import Navbar from "../components/Navbar";
import NowShowing from "../components/NowShowing";
import UpcomingMovie from "../components/UpcomingMovie";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import Badge from "../components/Badge";
import BenefitCard from "../components/BenefitCard";
import { PiStarOfDavidFill } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

function HomePage() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-25 items-center text-center">
        <section className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className=" w-fit text-primary bg-third font-bold text-xl rounded-full px-6 py-3 primary sm:text-m">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </div>
          <div className="flex flex-col items-center text-[64px] leading-none">
            <span className="font-normal">Experience the Magic of Cinema:</span>
            <span className="font-satoshi font-medium text-primary">
              Book Your Tickets Today
            </span>
          </div>
          <div>
            <span className="text-fifth">
              Sign up and get the ticket with a lot of discount
            </span>
            <span></span>
          </div>
        </section>
        <NowShowing />
        <div className="bg-black rounded-4xl h-105 w-full flex p-20 gap-8">
          <div className="flex flex-col justify-between w-[32%]">
            <Badge
              variant="secondary"
              className="font-bold text-xl h-[54px] w-fit px-8 flex items-center justify-center"
              children="WHY CHOOSE ME"
            />
            <div className="title-section text-sixth">
              Unleashing the Ultimate Movie Experience
            </div>
          </div>
          <div className="flex flex-row gap-6 w-[68%]">
            <BenefitCard icon={<PiStarOfDavidFill />} text="Guaranted" />
            <BenefitCard icon={<FaMoneyBillWave />} text="Affordable" />
            <BenefitCard
              icon={<RiCustomerService2Fill />}
              text="24/7 Customer Support"
            />
          </div>
        </div>
        <UpcomingMovie />
        <Subscribe />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;
