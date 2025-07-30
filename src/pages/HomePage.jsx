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
  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log("All env vars:", import.meta.env);
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-24 sm:mt-28 items-center text-center bg-third">
        <section className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className=" w-fit text-primary bg-fourth/40 font-bold text-[14px] sm:text-xl mx-6 rounded-full px-6 py-3 primary sm:text-m">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </div>
          <div className="flex flex-col items-center text-4xl px-6 py-2 sm:text-[64px] leading-none">
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
        <div className="bg-secondary rounded-4xl p-6 sm:h-105 w-full h-fit flex flex-col sm:flex-row sm:p-20 gap-8">
          <div className="flex flex-col gap-6 sm:gap-0 justify-between sm:w-[32%]">
            <Badge
              variant="secondary"
              className="font-bold text-xl h-[54px] w-full sm:w-fit px-8 flex items-center justify-center"
              children="WHY CHOOSE ME"
            />
            <div className="text-4xl sm:title-section text-sixth">
              Unleashing the Ultimate Movie Experience
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:w-[68%]">
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
