import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import NowShowing from "../components/NowShowing";
import CardWrap from "../components/CardWrap";
import UpcomingMovie from "../components/UpcomingMovie";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col mt-25 items-center text-center">
        <HeroSection />
        <NowShowing />
        <CardWrap />
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
