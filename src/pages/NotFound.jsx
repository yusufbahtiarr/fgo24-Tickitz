import React from "react";
import { Link } from "react-router-dom";
import ModulPayment from "./../components/ModulPayment";

function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-6">
      <span className="text-8xl font-bold">404 </span>
      <span className="text-4xl font-medium">Oops, This Page Not Found!</span>
    </div>
  );
}

export default NotFound;
