import Banner from "../components/Banner";
import FilterCinemas from "../components/FilterCinemas";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowMovie from "../components/ShowMovie";
import Subscribe from "../components/Subscribe";

function MoviePage() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-25 items-center text-center">
        <Banner />
        <FilterCinemas />
        <ShowMovie />
        <Subscribe />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default MoviePage;
