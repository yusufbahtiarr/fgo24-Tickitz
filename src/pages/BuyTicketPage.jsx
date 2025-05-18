import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BannerTicket from "./../components/BannerTicket";
import BookingTicket from "../components/BookingTicket";
Footer;

function BuyTicketPage() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-25 items-center">
        <BannerTicket />
        <BookingTicket />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default BuyTicketPage;
